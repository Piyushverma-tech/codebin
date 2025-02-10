import connect from '@/app/lib/connect';
import Tag from '@/app/Models/TagSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, clerkUserId } = await req.json();

    await connect();

    const tag = new Tag({
      name,
      clerkUserId,
    });

    const savedTag = await tag.save();

    return NextResponse.json({ tags: savedTag });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error creating tag' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const clerkId = req.nextUrl.searchParams.get('clerkId');
    await connect();
    const tags = await Tag.find({ clerkUserId: clerkId });
    return NextResponse.json({ tags: tags });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error getting tags' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const tagId = url.searchParams.get('tagId');

    if (!tagId) {
      return NextResponse.json({ error: 'No tagId provided' }, { status: 400 });
    }

    const tagToDelete = await Tag.findOneAndDelete({ _id: tagId });

    if (!tagToDelete) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: error, message: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const tagId = req.nextUrl.searchParams.get('tagId');
    const { name } = await req.json();

    if (!tagId) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
        { status: 400 }
      );
    }

    await connect();

    const updatedTag = await Tag.findByIdAndUpdate(
      tagId,
      { $set: { name } },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json({ tag: updatedTag });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
