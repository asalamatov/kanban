import Board from "@models/board";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { name, userId } = await req.json();
  console.log('Creating prompt: ', name, userId);
  try {
    await connectToDB();
    console.log('Connected to MongoDB');

    const newBoard = new Board({ name, users: [userId] });

    await newBoard.save();
    return new Response(JSON.stringify(newBoard), { status: 201 })
  } catch (error) {
    console.log('Error creating prompt: ', error.message);
    return new Response(JSON.stringify(error.message), {status: 500});
  }
};