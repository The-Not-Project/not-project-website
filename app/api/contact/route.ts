import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { message, email, type, token } = await req.json();

  if (!message || !type) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    {
      method: "POST",
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success || verifyData.score < 0.5) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed" },
      { status: 400 }
    );
  }

  const formatted = `
New ${type === "collab" ? "collaboration request" : "message"} from The Not Project:

${message}

---

Email: ${email?.trim() ? email : "not provided"}
  `.trim();

  try {
    await resend.emails.send({
      from: "The Not Project <contact@thenotproject.com>",
      to: [
        "lorenzo@thenotproject.com",
        "elghayate02@gmail.com",
        "sebastian.torres.codes@gmail.com",
      ],
      subject:
        type === "collab"
          ? "New Collaboration Request"
          : "New Message from The Not Project",
      text: formatted,
    });

    if (email?.trim()) {
      await resend.emails.send({
        from: "The Not Project <contact@thenotproject.com>",
        to: [email.trim()],
        subject:
          type === "collab"
            ? "Thanks for reaching out to collaborate"
            : "Thanks for your message",
        text:
          type === "collab"
            ? "Thanks for reaching out to collaborate! We'll read your message and get back to you soon, no matter what."
            : "Hey! We got your message and really appreciate you reaching out. If needed, we’ll get back to you soon.",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}
