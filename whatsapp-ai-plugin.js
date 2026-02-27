// ===== WhatsApp AI Auto Reply Plugin =====
// Creator: Syed Abdul Wahab Bukhari

let AI_ENABLED = true;

const CREATOR_LINE = "مجھے Syed Abdul Wahab Bukhari نے بنایا ہے";

// AI generic responses
const AI_BRAIN = [
  "جی، میں سن رہا ہوں 🙂",
  "آپ کی بات سمجھ آ گئی ہے۔",
  "براہِ کرم واضح کریں۔",
  "میں مدد کے لیے حاضر ہوں۔",
  "ٹھیک ہے 👍",
  "سمجھ گیا۔"
];

module.exports = {
  async execute(sock, msg) {
    if (!msg.message) return;
    if (msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const lower = text.toLowerCase();

    // Commands
    if (lower === ".ai on") {
      AI_ENABLED = true;
      return sock.sendMessage(from, { text: "🟢 AI ON" });
    }

    if (lower === ".ai off") {
      AI_ENABLED = false;
      return sock.sendMessage(from, { text: "🔴 AI OFF" });
    }

    if (!AI_ENABLED) return;

    const reply = AI_BRAIN[Math.floor(Math.random() * AI_BRAIN.length)];

    setTimeout(() => {
      sock.sendMessage(from, {
        text: `${reply}\n\n🤖 ${CREATOR_LINE}`
      });
    }, 2000);
  }
};
