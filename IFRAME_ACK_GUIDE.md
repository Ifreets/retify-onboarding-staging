# 📡 Hướng dẫn Iframe gửi ACK về Parent App

## 🎯 Mục đích

Khi iframe nhận được message từ parent app, cần gửi **ACK (Acknowledgment)** về để parent app **dừng retry ngay lập tức**, tránh gửi duplicate messages.

---

## 📥 Iframe nhận message từ Parent App

Message từ parent app sẽ có format:

```javascript
{
  from: 'parent-app',
  message_id: 'msg_1234567890_abc123xyz',  // ← Unique ID
  // ... các field khác của payload
}
```

---

## 📤 Iframe phải gửi ACK về

Khi nhận được message, iframe **BẮT BUỘC** phải gửi ACK về ngay:

```javascript
// Trong iframe code
window.addEventListener('message', event => {
  let payload

  try {
    payload =
      typeof event.data === 'string' ? JSON.parse(event.data) : event.data
  } catch (e) {
    return
  }

  // Kiểm tra message từ parent app
  if (payload?.from === 'parent-app' && payload?.message_id) {
    // ✅ GỬI ACK NGAY LẬP TỨC
    window.parent.postMessage(
      {
        type: 'MESSAGE_ACK',
        message_id: payload.message_id, // ← Trả lại message_id
      },
      '*',
    )

    console.log(`[IFRAME] Sent ACK for message: ${payload.message_id}`)

    // Sau đó xử lý message như bình thường
    handleMessage(payload)
  }
})
```

---

## 🔄 Flow hoàn chỉnh

```
┌─────────────┐                           ┌──────────┐
│ Parent App  │                           │  Iframe  │
└──────┬──────┘                           └────┬─────┘
       │                                       │
       │  1. Send message (với message_id)    │
       ├──────────────────────────────────────>│
       │                                       │
       │  2. Retry mỗi 200ms (tối đa 5s)      │
       ├──────────────────────────────────────>│
       │                                       │
       │  3. Iframe nhận được & gửi ACK       │
       │<──────────────────────────────────────┤
       │     { type: 'MESSAGE_ACK',            │
       │       message_id: '...' }             │
       │                                       │
       │  4. Parent dừng retry ngay            │
       │     ✅ Success!                       │
       │                                       │
```

---

## ⚙️ Config hiện tại

- **Retry interval**: 200ms
- **Max duration**: 5 giây
- **Max attempts**: 25 lần (5000ms / 200ms)
- **Dừng khi**: Nhận ACK hoặc hết 5s

---

## 🐛 Debug

### Parent App logs:

```
[BRIDGE] [msg_xxx] Attempt 1: Forwarded to iframe: {...}
[BRIDGE] [msg_xxx] Attempt 2: Forwarded to iframe: {...}
[BRIDGE] [msg_xxx] Received ACK from iframe  ← ✅ Nhận ACK
[BRIDGE] [msg_xxx] Stopped retry             ← ✅ Dừng retry
```

### Iframe logs:

```
[IFRAME] Received message: {...}
[IFRAME] Sent ACK for message: msg_xxx
```

---

## ⚠️ Lưu ý

1. **Bắt buộc gửi ACK**: Nếu không gửi, parent sẽ retry 25 lần trong 5s
2. **Gửi ACK ngay**: Đừng đợi xử lý xong message mới gửi ACK
3. **Trả đúng message_id**: ACK phải chứa đúng `message_id` nhận được
4. **Dùng window.parent.postMessage**: Không phải `window.postMessage`

---

## ✅ Checklist

- [ ] Iframe có listener cho `message` event
- [ ] Parse `event.data` an toàn (try/catch)
- [ ] Kiểm tra `payload.from === 'parent-app'`
- [ ] Kiểm tra `payload.message_id` tồn tại
- [ ] Gửi ACK ngay với `type: 'MESSAGE_ACK'`
- [ ] Trả đúng `message_id` trong ACK
- [ ] Test xem parent có log "Stopped retry" không
