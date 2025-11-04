import connect from '@/app/lib/connect';
import SingleSnippet from '@/app/Models/SnippetSchema';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {
      title,
      clerkUserId,
      isFavorite = false,
      isTrash = false,
      tags = [],
      description = '',
      code = '',
      timeComplexity = '',
      optimizationPercent,
      language = '',
      creationDate = new Date().toISOString(),
    } = await req.json();

    if (!title || !clerkUserId) {
      return NextResponse.json(
        { error: 'Title and clerkUserId are required' },
        { status: 400 }
      );
    }

    await connect();

    const note = new SingleSnippet({
      title,
      clerkUserId,
      isFavorite,
      isTrash,
      tags,
      description,
      code,
      timeComplexity,
      optimizationPercent,
      language,
      creationDate,
    });

    const savedNote = await note.save();

    return NextResponse.json({ notes: savedNote });
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const clerkId = req.nextUrl.searchParams.get('clerkId');
    await connect();
    const notes = await SingleSnippet.find({ clerkUserId: clerkId });
    return NextResponse.json({ notes: notes });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const snippetId = req.nextUrl.searchParams.get('snippetId');

    if (!snippetId) {
      return NextResponse.json(
        { error: 'Snippet ID is required for updates' },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(snippetId)) {
      return NextResponse.json(
        { error: 'Invalid Snippet ID' },
        { status: 400 }
      );
    }

    const updatedData = await req.json();
    await connect();

    const updatedSnippet = await SingleSnippet.findByIdAndUpdate(
      new Types.ObjectId(snippetId),
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedSnippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json(updatedSnippet);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const snippetId = url.searchParams.get('snippetId');

    if (!snippetId) {
      return NextResponse.json(
        { error: 'Snippet ID is required for deletion' },
        { status: 400 }
      );
    }

    const snippetToDelete = await SingleSnippet.findOneAndDelete({
      _id: snippetId,
    });

    if (!snippetToDelete) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: error, message: 'Error deleting note' },
      { status: 400 }
    );
  }
}
