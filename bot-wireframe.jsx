import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');`;

const SAMPLE_NOTIFICATIONS = [
  { id: 1, title: "新歓準備の開始", date: "2026-03-01", dest: "slack", link: "https://docs.google.com/...", sent: false, message: "新歓準備を始める時期です。昨年の会場リストを確認して、仮予約の連絡を今週中に入れておいてください。申請フォームは例年3月末が締め切りです。" },
  { id: 2, title: "ステージ申請の締め切り確認", date: "2026-03-15", dest: "email", link: "", sent: false, message: "ステージ申請の締め切りが近づいています。昨年の書類を参考に、今年の出演希望日・人数・曲目を記入して、担当窓口に提出してください。" },
  { id: 3, title: "定期演奏会の会場予約", date: "2026-04-01", dest: "slack", link: "https://docs.google.com/...", sent: false, message: "定期演奏会の会場予約を進める時期です。昨年使用した会場の空き状況を確認し、仮押さえをしておきましょう。予算感も昨年のシートを参照してください。" },
  { id: 4, title: "前期会計報告の提出", date: "2026-06-30", dest: "email", link: "", sent: false, message: "前期の会計報告を大学窓口へ提出する時期です。領収書の整理・合計額の確認・捺印を済ませたうえで、期日までに提出してください。不明点は昨年の担当者に確認を。" },
  { id: 5, title: "次年度メンバー募集の準備", date: "2026-09-01", dest: "slack", link: "", sent: false, message: "後期の新入生勧誘に向けて、募集ポスターやSNS投稿の準備を始める時期です。昨年のデザインデータはサークルドライブの「新歓素材」フォルダにあります。" },
  { id: 6, title: "定期演奏会の広報開始", date: "2026-10-01", dest: "slack", link: "https://docs.google.com/...", sent: false, message: "定期演奏会の告知を開始する時期です。SNS・ポスター・チラシの各担当に声をかけて、広報スケジュールを確認してください。" },
];

const MONTH_LABELS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

function groupByMonth(notifications) {
  const groups = {};
  notifications.forEach(n => {
    const month = new Date(n.date).getMonth();
    if (!groups[month]) groups[month] = [];
    groups[month].push(n);
  });
  return groups;
}

const IconPlus = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconSlack = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.52 2.528 2.528 0 01-2.522-2.52 2.528 2.528 0 012.522-2.52h2.52v2.52zm1.271 0a2.528 2.528 0 012.52-2.52 2.528 2.528 0 012.52 2.52v6.313a2.528 2.528 0 01-2.52 2.522 2.528 2.528 0 01-2.52-2.522v-6.313zm2.52-10.123a2.528 2.528 0 01-2.52-2.52A2.528 2.528 0 018.833 0a2.528 2.528 0 012.52 2.522v2.52H8.833zm0 1.271a2.528 2.528 0 012.52 2.52 2.528 2.528 0 01-2.52 2.52H2.522A2.528 2.528 0 010 8.833a2.528 2.528 0 012.522-2.52H8.833zm10.123 2.52a2.528 2.528 0 012.522-2.52A2.528 2.528 0 0124 8.833a2.528 2.528 0 01-2.522 2.52h-2.522V8.833zm-1.268 0a2.528 2.528 0 01-2.52 2.52 2.528 2.528 0 01-2.522-2.52V2.522A2.528 2.528 0 0115.165 0a2.528 2.528 0 012.52 2.522V8.833zm-2.52 10.123a2.528 2.528 0 012.52 2.522A2.528 2.528 0 0115.165 24a2.528 2.528 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.528 2.528 0 01-2.52-2.52 2.528 2.528 0 012.52-2.522h6.313A2.528 2.528 0 0124 15.165a2.528 2.528 0 01-2.522 2.52h-6.313z"/></svg>;
const IconMail = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
const IconEdit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconSend = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IconBack = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const IconCopy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IconLink = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;

const C = {
  bg: "#f0ede8", surface: "#ffffff", border: "#e0dbd2",
  accent: "#3d6b52", accentLight: "#e8f0eb", accentMid: "#5a8a6e",
  text: "#1a1a1a", textSub: "#777", textMute: "#bbb",
  danger: "#c0392b", dangerLight: "#fdf0ef",
  yellow: "#d08000", yellowLight: "#fef9ec",
  slackColor: "#4a154b", slackBg: "#f3eef5",
  gmailColor: "#c5221f", gmailBg: "#fdf0ef",
};

const base = {
  app: { fontFamily: "'Noto Sans JP', sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", fontSize: 14, color: C.text },
  topbar: { background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  body: { flex: 1, padding: "20px 16px", maxWidth: 640, margin: "0 auto", width: "100%" },
  sectionHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 24 },
  sectionLabel: { fontSize: 12, fontWeight: 700, color: C.textSub, letterSpacing: "0.06em", whiteSpace: "nowrap" },
  sectionLine: { flex: 1, height: 1, background: C.border },
  iconBtn: { background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: C.textSub, display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif" },
  actionBtn: { background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: C.textSub, display: "flex", alignItems: "center" },
  fab: { position: "fixed", bottom: 24, right: 24, background: C.accent, color: "white", border: "none", borderRadius: 28, padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(61,107,82,0.35)", fontFamily: "'Noto Sans JP', sans-serif" },
  formGroup: { marginBottom: 20 },
  label: { display: "block", fontWeight: 700, fontSize: 13, marginBottom: 6, color: C.text },
  labelSub: { fontWeight: 400, fontSize: 12, color: C.textSub, marginLeft: 6 },
  input: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: C.text, background: C.surface, outline: "none" },
  textarea: { width: "100%", border: `1.5px solid ${C.accent}`, borderRadius: 8, padding: "12px", fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: C.text, background: C.surface, outline: "none", resize: "vertical", minHeight: 180, lineHeight: 1.85 },
  segBtn: (active) => ({ flex: 1, padding: "9px 0", borderRadius: 8, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? C.accentLight : C.surface, color: active ? C.accent : C.textSub, fontWeight: active ? 700 : 400, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Noto Sans JP', sans-serif" }),
  btnPrimary: { background: C.accent, color: "white", border: "none", borderRadius: 8, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", display: "flex", alignItems: "center", gap: 6 },
  btnSecondary: { background: C.surface, color: C.textSub, border: `1px solid ${C.border}`, borderRadius: 8, padding: "11px 20px", fontWeight: 500, fontSize: 14, cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif" },
  btnDanger: { background: C.dangerLight, color: C.danger, border: `1px solid #f5c6c2`, borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", display: "flex", alignItems: "center", gap: 6 },
  btnTest: { background: C.yellowLight, color: C.yellow, border: `1px solid #f0d080`, borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", display: "flex", alignItems: "center", gap: 6 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "0 16px" },
  modal: { background: C.surface, borderRadius: "14px", padding: "28px 24px", width: "100%", maxWidth: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" },
};

function DestBadge({ dest }) {
  const isSlack = dest === "slack";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: isSlack ? C.slackBg : C.gmailBg, color: isSlack ? C.slackColor : C.gmailColor }}>
      {isSlack ? <IconSlack size={11} /> : <IconMail size={11} />}
      {isSlack ? "Slack" : "Gmail"}
    </span>
  );
}

function NotifCard({ n, onEdit, onTest, onDelete }) {
  const preview = n.message
    ? (n.message.length > 75 ? n.message.slice(0, 75) + "…" : n.message)
    : "（メッセージ未設定）";
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4 }}>{n.title}</div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <button style={base.actionBtn} onClick={() => onTest(n)} title="今すぐ送信"><IconSend /></button>
          <button style={base.actionBtn} onClick={() => onEdit(n)} title="編集"><IconEdit /></button>
          <button style={{ ...base.actionBtn, color: C.danger }} onClick={() => onDelete(n.id)}><IconTrash /></button>
        </div>
      </div>
      {/* メッセージプレビュー */}
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.65, marginBottom: 8 }}>{preview}</div>
      {/* フッター */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: C.textMute }}>
          {n.date.replace(/-/g, "/")}（{new Date(n.date).toLocaleDateString("ja-JP", { weekday: "short" })}）
        </span>
        <DestBadge dest={n.dest} />
        {n.link && <span style={{ fontSize: 11, color: C.accentMid, display: "inline-flex", alignItems: "center", gap: 3 }}><IconLink />リンクあり</span>}
      </div>
    </div>
  );
}

function ListScreen({ notifications, setNotifications, setScreen, setEditTarget, setTestTarget }) {
  const groups = groupByMonth(notifications);
  const months = Object.keys(groups).map(Number).sort((a, b) => a - b);
  const handleDelete = (id) => { if (window.confirm("この通知を削除しますか？")) setNotifications(prev => prev.filter(n => n.id !== id)); };

  return (
    <div style={base.app}>
      <div style={base.topbar}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.accent, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔔</span>引き継ぎ通知Bot
        </div>
        <button style={base.iconBtn} onClick={() => setScreen("settings")}><IconSettings /></button>
      </div>
      <div style={base.body}>
        {months.map(month => (
          <div key={month}>
            <div style={base.sectionHeader}>
              <span style={base.sectionLabel}>{MONTH_LABELS[month]}</span>
              <div style={base.sectionLine} />
              <span style={{ fontSize: 11, color: C.textMute, whiteSpace: "nowrap" }}>{groups[month].length}件</span>
            </div>
            {groups[month].map(n => (
              <NotifCard key={n.id} n={n}
                onEdit={(n) => { setEditTarget(n); setScreen("edit"); }}
                onTest={(n) => setTestTarget(n)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ))}
        {/* 前年度複製バナー（下部） */}
        <div style={{ background: C.yellowLight, border: `1px solid #f0d080`, borderRadius: 10, padding: "12px 16px", marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>📋</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#5a3e00" }}>前年度スケジュールから複製</div>
            <div style={{ fontSize: 12, color: "#8a6020", marginTop: 1 }}>日付を+1年してそのまま引き継ぐ</div>
          </div>
          <button style={{ background: C.yellow, color: "white", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
            <IconCopy />複製
          </button>
        </div>
        <div style={{ height: 100 }} />
      </div>
      <button style={base.fab} onClick={() => { setEditTarget(null); setScreen("edit"); }}>
        <IconPlus />通知を追加
      </button>
    </div>
  );
}

function EditScreen({ target, setScreen, setNotifications }) {
  const isNew = !target;
  const [form, setForm] = useState(target || { title: "", message: "", date: "", dest: "slack", link: "" });
  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    if (!form.title || !form.date || !form.message) { alert("タイトル・メッセージ・送信日は必須です"); return; }
    setNotifications(prev => isNew ? [...prev, { ...form, id: Date.now(), sent: false }] : prev.map(n => n.id === form.id ? form : n));
    setScreen("list");
  };

  return (
    <div style={base.app}>
      <div style={base.topbar}>
        <button style={base.iconBtn} onClick={() => setScreen("list")}><IconBack /><span style={{ fontSize: 13 }}>一覧に戻る</span></button>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{isNew ? "通知を追加" : "通知を編集"}</div>
        <div style={{ width: 80 }} />
      </div>
      <div style={base.body}>
        {/* メッセージ（主役） */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
          <label style={{ ...base.label, marginBottom: 10, fontSize: 14 }}>
            通知メッセージ
            <span style={{ ...base.labelSub, fontSize: 11 }}>* 届いた人が何をすべきか、具体的に書きましょう</span>
          </label>
          <textarea
            style={base.textarea}
            placeholder={"例：新歓準備を始める時期です。昨年の会場リストを確認して、仮予約の連絡を今週中に入れておいてください。申請フォームは例年3月末が締め切りです。"}
            value={form.message}
            onChange={e => update("message", e.target.value)}
            rows={8}
          />
          <div style={{ textAlign: "right", fontSize: 11, color: form.message.length > 0 ? C.accentMid : C.textMute, marginTop: 4 }}>
            {form.message.length}文字
          </div>
        </div>

        {/* タイトル */}
        <div style={base.formGroup}>
          <label style={base.label}>タイトル<span style={base.labelSub}>* 一覧での表示名</span></label>
          <input style={base.input} placeholder="例：新歓準備の開始" value={form.title} onChange={e => update("title", e.target.value)} />
        </div>

        {/* 送信日 */}
        <div style={base.formGroup}>
          <label style={base.label}>送信日<span style={base.labelSub}>* この日の朝に自動送信されます</span></label>
          <input style={base.input} type="date" value={form.date} onChange={e => update("date", e.target.value)} />
        </div>

        {/* 送信先 */}
        <div style={base.formGroup}>
          <label style={base.label}>送信先</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={base.segBtn(form.dest === "slack")} onClick={() => update("dest", "slack")}><IconSlack />Slack</button>
            <button style={base.segBtn(form.dest === "email")} onClick={() => update("dest", "email")}><IconMail />Gmail</button>
          </div>
          <div style={{ fontSize: 12, color: C.textSub, marginTop: 6 }}>
            詳細（Webhook URL・メールアドレス）は
            <button style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "'Noto Sans JP', sans-serif", padding: 0 }}
              onClick={() => setScreen("settings")}>設定画面</button>
            で管理します
          </div>
        </div>

        {/* リンク（控えめ・任意） */}
        <div style={base.formGroup}>
          <label style={base.label}>参考リンク<span style={base.labelSub}>任意 — メッセージだけで伝わる場合は不要です</span></label>
          <input style={base.input} placeholder="https://docs.google.com/..." value={form.link} onChange={e => update("link", e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={base.btnPrimary} onClick={handleSave}>保存する</button>
          <button style={base.btnSecondary} onClick={() => setScreen("list")}>キャンセル</button>
        </div>

        {!isNew && (
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <button style={base.btnDanger} onClick={() => { if (window.confirm("削除しますか？")) { setNotifications(prev => prev.filter(n => n.id !== form.id)); setScreen("list"); }}}>
              <IconTrash />この通知を削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsScreen({ setScreen }) {
  const [slackHook, setSlackHook] = useState("https://hooks.slack.com/services/T.../B.../...");
  const [emails, setEmails] = useState(["successor@example.com"]);
  const [newEmail, setNewEmail] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div style={base.app}>
      <div style={base.topbar}>
        <button style={base.iconBtn} onClick={() => setScreen("list")}><IconBack /><span style={{ fontSize: 13 }}>戻る</span></button>
        <div style={{ fontWeight: 700, fontSize: 15 }}>送信先の設定</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={base.body}>
        <div style={base.sectionHeader}>
          <span style={{ ...base.sectionLabel, display: "flex", alignItems: "center", gap: 5 }}><IconSlack />Slack</span>
          <div style={base.sectionLine} />
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px", marginBottom: 16 }}>
          <label style={{ ...base.label, marginBottom: 8 }}>Incoming Webhook URL</label>
          <input style={base.input} value={slackHook} onChange={e => setSlackHook(e.target.value)} />
          <div style={{ fontSize: 12, color: C.textSub, marginTop: 6 }}>Slack アプリ管理画面の「Incoming Webhooks」から発行できます。送信先チャンネルはWebhook URL作成時に決まります。</div>
        </div>

        <div style={base.sectionHeader}>
          <span style={{ ...base.sectionLabel, display: "flex", alignItems: "center", gap: 5 }}><IconMail />Gmail 送信先</span>
          <div style={base.sectionLine} />
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px", marginBottom: 20 }}>
          {emails.map((email, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <div style={{ flex: 1, padding: "9px 12px", background: C.bg, borderRadius: 6, fontSize: 13 }}>{email}</div>
              <button style={{ ...base.actionBtn, color: C.danger }} onClick={() => setEmails(prev => prev.filter((_, j) => j !== i))}><IconTrash /></button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <input style={{ ...base.input, flex: 1 }} placeholder="メールアドレスを追加" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
            <button style={{ ...base.btnPrimary, padding: "10px 16px" }} onClick={() => { if (newEmail) { setEmails(prev => [...prev, newEmail]); setNewEmail(""); }}}>追加</button>
          </div>
        </div>

        <button style={{ ...base.btnPrimary, width: "100%", justifyContent: "center" }}
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? "✓ 保存しました" : "設定を保存"}
        </button>

        <div style={{ ...base.sectionHeader, marginTop: 40 }}>
          <span style={{ ...base.sectionLabel, color: C.danger }}>データ管理</span>
          <div style={{ ...base.sectionLine, background: "#f5c6c2" }} />
        </div>
        <div style={{ background: C.surface, border: `1px solid #f5c6c2`, borderRadius: 10, padding: "16px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>全データを削除</div>
          <div style={{ fontSize: 12, color: C.textSub, marginBottom: 12 }}>全ての通知設定を削除します。この操作は元に戻せません。</div>
          <button style={base.btnDanger}><IconTrash />全データを削除</button>
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function TestModal({ target, onClose }) {
  const [sent, setSent] = useState(false);
  return (
    <div style={base.overlay} onClick={onClose}>
      <div style={base.modal} onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>今すぐ送信</div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 14 }}>以下の内容を今すぐ送信して、届くか確認できます。</div>
            <div style={{ marginBottom: 12 }}><DestBadge dest={target.dest} /></div>
            <div style={{ background: C.bg, borderRadius: 8, padding: "14px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{target.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.8, color: C.text, whiteSpace: "pre-wrap" }}>
                {target.message || "（メッセージ未設定）"}
              </div>
              {target.link && (
                <div style={{ marginTop: 10, fontSize: 12, color: C.accentMid, display: "flex", alignItems: "center", gap: 4 }}>
                  <IconLink />{target.link}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={base.btnTest} onClick={() => setSent(true)}><IconSend />今すぐ送信</button>
              <button style={base.btnSecondary} onClick={onClose}>キャンセル</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>送信しました</div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 20 }}>
              {target.dest === "slack" ? "Slackチャンネル" : "メール"}に通知が届いているか確認してください。
            </div>
            <button style={base.btnPrimary} onClick={onClose}>閉じる</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("list");
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [editTarget, setEditTarget] = useState(null);
  const [testTarget, setTestTarget] = useState(null);

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <style>{FONTS}</style>
      {screen === "list" && <ListScreen notifications={notifications} setNotifications={setNotifications} setScreen={setScreen} setEditTarget={setEditTarget} setTestTarget={setTestTarget} />}
      {screen === "edit" && <EditScreen target={editTarget} setScreen={setScreen} setNotifications={setNotifications} />}
      {screen === "settings" && <SettingsScreen setScreen={setScreen} />}
      {testTarget && <TestModal target={testTarget} onClose={() => setTestTarget(null)} />}
    </div>
  );
}
