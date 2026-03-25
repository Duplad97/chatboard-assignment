import { revalidatePath } from "next/cache";
import { supabase, type Message } from "@/lib/supabase";

async function createMessage(formData: FormData) {
  "use server";

  const content = formData.get("content");
  if (typeof content !== "string") {
    return;
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return;
  }

  const { error } = await supabase.from("messages").insert({ content: trimmed });

  if (error) {
    throw new Error(`Failed to create message: ${error.message}`);
  }

  revalidatePath("/");
}

async function deleteMessage(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (typeof id !== "string") {
    return;
  }

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }

  revalidatePath("/");
}

async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("id, content, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch messages: ${error.message}`);
  }

  return data ?? [];
}

function formatDateTime(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export default async function Home() {
  const messages = await getMessages();

  return (
    <div className="chatboard-shell">
      <main className="chatboard-card">
        <header className="chatboard-header">
          <p className="chatboard-kicker">Community Board</p>
          <h1>Chat Board</h1>
          <p className="chatboard-subtitle">Share a thought. Keep it simple.</p>
        </header>

        <section className="chatboard-composer" aria-label="Create message">
          <form action={createMessage} className="chatboard-form">
            <label htmlFor="content" className="sr-only">
              Message
            </label>
            <input
              id="content"
              name="content"
              type="text"
              maxLength={280}
              placeholder="Write a message..."
              required
            />
            <button type="submit">Save</button>
          </form>
        </section>

        <section className="chatboard-messages" aria-label="Message list">
          {messages.length === 0 ? (
            <p className="chatboard-empty">No messages yet. Be the first one to post.</p>
          ) : (
            <ul>
              {messages.map((message) => (
                <li key={message.id} className="chatboard-message-item">
                  <div>
                    <p className="chatboard-message-content">{message.content}</p>
                    <p className="chatboard-message-date">{formatDateTime(message.created_at)}</p>
                  </div>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button type="submit" className="danger">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
