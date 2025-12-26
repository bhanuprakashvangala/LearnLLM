import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get lessons completed count
    const lessonsCompleted = await prisma.userProgress.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    // Get challenges completed count
    const challengesCompleted = await prisma.challengeCompletion.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    // Get total time spent (in hours)
    const timeSpentResult = await prisma.userProgress.aggregate({
      where: {
        userId: session.user.id,
      },
      _sum: {
        timeSpent: true,
      },
    });
    const hoursLearned = Math.round((timeSpentResult._sum.timeSpent || 0) / 60);

    // Calculate streak (simplified - just check consecutive days)
    // For now, return 0 as streak calculation requires more complex logic
    const currentStreak = 0;

    return NextResponse.json({
      lessonsCompleted,
      challengesCompleted,
      hoursLearned,
      currentStreak,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
