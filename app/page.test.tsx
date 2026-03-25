import { render, screen } from "@testing-library/react";
import Home from "./page";
import { supabase } from "@/lib/supabase";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("@/lib/supabase", () => {
  const mockChain = {
    select: jest.fn().mockReturnThis(),
    order: jest.fn(),
  };

  return {
    supabase: {
      from: jest.fn(() => mockChain),
    },
  };
});

describe("Chat board page", () => {
  it("renders empty state when no messages", async () => {
    const from = supabase.from as jest.Mock;
    const chain = from("messages");
    (chain.order as jest.Mock).mockResolvedValueOnce({ data: [], error: null });

    const ui = await Home();
    render(ui);

    expect(screen.getByRole("heading", { name: "Chat Board" })).toBeInTheDocument();
    expect(screen.getByText("No messages yet. Be the first one to post.")).toBeInTheDocument();
  });

  it("renders messages from Supabase", async () => {
    const from = supabase.from as jest.Mock;
    const chain = from("messages");

    (chain.order as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          content: "Hello chat",
          created_at: "2026-03-25T14:00:00.000Z",
        },
      ],
      error: null,
    });

    const ui = await Home();
    render(ui);

    expect(screen.getByText("Hello chat")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
