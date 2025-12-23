# 📚 Retify Onboarding - Tài Liệu Kỹ Thuật

## 📋 Tổng Quan

**Retify Onboarding** là một ứng dụng web được xây dựng bằng **Vue 3 + TypeScript + Vite**, dùng để hướng dẫn người dùng thiết lập tài khoản doanh nghiệp trên nền tảng Retify. Ứng dụng hỗ trợ cả web browser và nhúng vào mobile app native thông qua WebView.

---

## 🛠️ Tech Stack

| Công nghệ   | Phiên bản | Mô tả                            |
| ----------- | --------- | -------------------------------- |
| Vue.js      | 3.5.x     | Framework JavaScript progressive |
| TypeScript  | 5.8.x     | Typed JavaScript                 |
| Vite        | 7.0.x     | Build tool & dev server          |
| Pinia       | 3.0.x     | State management                 |
| Vue Router  | 4.5.x     | Client-side routing              |
| TailwindCSS | 3.x       | Utility-first CSS framework      |
| Axios       | 1.11.x    | HTTP client                      |
| Radix Vue   | 1.9.x     | Unstyled UI components           |
| Chart.js    | 4.5.x     | Data visualization               |

---

## 📁 Cấu Trúc Dự Án

```
retify-onboarding/
├── public/                     # Static assets
├── src/
│   ├── api/                    # API services
│   │   ├── axios.ts            # Axios instance & config
│   │   ├── chatbot.ts          # Chatbot API service
│   │   ├── contact.ts          # Contact API service
│   │   ├── merchant.ts         # Merchant API service
│   │   ├── order.ts            # Order API service
│   │   └── index.ts            # Export aggregator
│   ├── assets/                 # Tài nguyên tĩnh (images, fonts)
│   ├── components/             # Vue components
│   │   ├── common/             # Components dùng chung
│   │   ├── icons/              # Icon components
│   │   └── ui/                 # UI components (buttons, inputs, etc.)
│   ├── composables/            # Vue composables (reusable logic)
│   ├── env/                    # Environment configuration
│   ├── interfaces/             # TypeScript interfaces
│   ├── router/                 # Vue Router configuration
│   │   └── index.ts            # Route definitions
│   ├── services/               # Business logic services
│   ├── stores/                 # Pinia stores
│   │   ├── app.ts              # App-wide state
│   │   ├── contact.ts          # Contact state
│   │   ├── onboarding.ts       # Onboarding flow state
│   │   ├── order.ts            # Order state
│   │   └── index.ts            # Export aggregator
│   ├── utils/                  # Utility functions
│   ├── views/                  # Page components
│   │   ├── OnBoarding/         # Onboarding steps
│   │   │   ├── Step1.vue       # Chọn loại doanh nghiệp
│   │   │   ├── Step2.vue       # Nhập thông tin doanh nghiệp
│   │   │   ├── Step3.vue       # Kết nối & hoàn tất
│   │   │   ├── Tabs.vue        # Tab progress indicator
│   │   │   └── composable/     # Composables riêng cho onboarding
│   │   ├── HomeView/           # Dashboard sau khi onboarding
│   │   │   ├── order/          # Quản lý đơn hàng
│   │   │   ├── customer/       # Quản lý khách hàng
│   │   │   ├── conversation/   # Quản lý hội thoại
│   │   │   ├── report/         # Báo cáo
│   │   │   └── setting/        # Cài đặt
│   │   ├── chat/               # Chat page
│   │   ├── Onboarding.vue      # Main onboarding orchestrator
│   │   └── HomeView.vue        # Main home layout
│   ├── App.vue                 # Root component
│   └── main.ts                 # Application entry point
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment config
```

---

## 🔀 Routing

Ứng dụng sử dụng Vue Router với cấu trúc routes:

| Path                 | Component                | Mô tả                   |
| -------------------- | ------------------------ | ----------------------- |
| `/`                  | Redirect → `/onboarding` | Trang chủ               |
| `/onboarding`        | `Onboarding.vue`         | Luồng onboarding 3 bước |
| `/home`              | `HomeView.vue`           | Dashboard chính         |
| `/home/order`        | `Order.vue`              | Danh sách đơn hàng      |
| `/home/order/:id`    | `OrderDetail.vue`        | Chi tiết đơn hàng       |
| `/home/customer`     | `Customer.vue`           | Danh sách khách hàng    |
| `/home/customer/:id` | `CustomerDetail.vue`     | Chi tiết khách hàng     |
| `/home/conversation` | `Conversation.vue`       | Danh sách hội thoại     |
| `/home/report`       | `Report.vue`             | Báo cáo thống kê        |
| `/home/setting`      | `Setting.vue`            | Cài đặt                 |
| `/c/:id`             | `Chat.vue`               | Trang chat              |

---

## 🚀 Luồng Onboarding

### Tổng quan

Onboarding bao gồm **3 bước chính** để thiết lập doanh nghiệp mới:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Step 1       │────▶│    Step 2       │────▶│    Step 3       │
│  Business Type  │     │ Business Info   │     │  Connect & QR   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Step 0: Chọn Organization (Điều kiện)

- **Hiển thị khi**: User có nhiều hơn 1 organization
- **Chức năng**: Cho phép user chọn organization để tiếp tục
- **Dữ liệu lưu**: `org_id`

### Step 1: Chọn Loại Doanh Nghiệp (`Step1.vue`)

- **Mục đích**: Thu thập loại hình kinh doanh
- **Các loại doanh nghiệp hỗ trợ**:
  - 🍽️ Restaurant
  - ☕ Cafe & Bar
  - 🥐 Bakery & Patisserie
  - 🚚 Food Truck
  - 🍴 Catering Service
  - 🍕 Pizzeria
- **Dữ liệu lưu**: `business_info.type`

### Step 2: Thông Tin Doanh Nghiệp (`Step2.vue`)

- **Mục đích**: Thu thập thông tin chi tiết
- **Input fields**:
  - Business Name (bắt buộc)
  - Menu Website URL (tùy chọn)
  - Upload Menu Photos (tùy chọn - hỗ trợ JPG, PNG, WEBP ≤ 5MB)
- **Xử lý tự động khi Next**:
  1. Tạo page chatbot mới (nếu chưa có)
  2. Tạo token merchant
  3. Setting merchant configuration
  4. Tạo products từ URL/ảnh menu
  5. Bật auto-assign staff
  6. Setup AI Agent và page settings
- **Dữ liệu lưu**: `business_info.name`, `business_info.web_url`, `business_info.menu_url`

### Step 3: Kết Nối & Hoàn Tất (`Step3.vue`)

- **Mục đích**: Hiển thị link & QR code cho khách hàng
- **Chức năng**:
  - Hiển thị QR code của page
  - Copy link chia sẻ
  - (Planned) Kết nối mạng xã hội: Whatsapp, Instagram, Facebook, Tiktok, Website
- **Điều kiện Finish**:
  - ✅ `is_setup.page = true`
  - ✅ `is_setup.auto_assign_staff = true`
  - ✅ `is_setup.product = true`
  - ✅ `is_setup.ai_agent = true`

---

## 🗃️ State Management (Pinia Stores)

### `useAppStore` (`stores/app.ts`)

Quản lý state toàn cục của ứng dụng.

```typescript
interface IAppStore {
  /** Token xác thực chatbot */
  chatbot_token: string
  /** Token xác thực merchant */
  merchant_token: string
}
```

### `useOnBoardingStore` (`stores/onboarding.ts`)

Quản lý state riêng cho luồng onboarding.

```typescript
interface IOnBoardingStore {
  /** Thông tin doanh nghiệp */
  business_info: {
    type: string // Loại doanh nghiệp
    name: string // Tên doanh nghiệp
    web_url: string // URL website menu
    menu_url: string // URL ảnh menu đã upload
  }

  /** Dữ liệu đã chọn */
  selected_data: {
    org_id: string // ID organization
    page_id: string // ID page chatbot
    user_id: string // ID user/staff
  }

  /** Trạng thái setup (flags) */
  is_setup: {
    ai_agent: boolean // Đã setup AI agent
    page: boolean // Đã setup page settings
    product: boolean // Đã import products
    auto_assign_staff: boolean // Đã bật auto-assign
  }
}
```

---

## 🌐 API Services

### `ChatbotServiceAPI` (`api/chatbot.ts`)

Giao tiếp với backend chatbot.

| Method                       | Endpoint                               | Mô tả                       |
| ---------------------------- | -------------------------------------- | --------------------------- |
| `getOrganizations()`         | `app/organization/read_org`            | Lấy danh sách tổ chức       |
| `getPages(org_id)`           | `app/owner_ship/read_page`             | Lấy danh sách pages của org |
| `createPage(data)`           | `app/page/create_website_page`         | Tạo page mới                |
| `getPageInfo(data)`          | `app/page/get_page_info_to_chat`       | Lấy thông tin page          |
| `getAIAgents(org_id)`        | `app/agent/get_agent`                  | Lấy danh sách AI agents     |
| `createAIAgent(org_id)`      | `app/agent/create_agent`               | Tạo AI agent mới            |
| `updateSettingPage(data)`    | `app/page/update_page_setting`         | Cập nhật settings page      |
| `updateSettingAIAgent(data)` | `app/page/update_page_setting`         | Cập nhật settings AI        |
| `autoAssignStaff(_id)`       | `app/staff/update`                     | Bật auto-assign staff       |
| `updateSetupStatus()`        | `app/chatbot_user/update_setup_status` | Đánh dấu hoàn tất setup     |

### `MerchantServiceAPI` (`api/merchant.ts`)

Giao tiếp với backend merchant.

| Method                         | Endpoint                                 | Mô tả                      |
| ------------------------------ | ---------------------------------------- | -------------------------- |
| `createToken(data)`            | `v1/auth/chatbox_login`                  | Tạo merchant token         |
| `uploadFile(data)`             | `v1/internals/attachment/upload`         | Upload file/ảnh            |
| `createProductFromImage(data)` | `product/import_data_url`                | Import products từ URL     |
| `updateEmployeeId(device_id)`  | `v1/systems/employee/update_employee_id` | Cập nhật employee ID       |
| `getEmployees()`               | `v1/systems/employee/get_employee`       | Lấy danh sách nhân sự      |
| `settingMerchant()`            | `setting/save_setting`                   | Lưu cấu hình merchant      |
| `getBusinessInfo(data)`        | `v1/business/get_business_info`          | Lấy thông tin doanh nghiệp |
| `getBusinessSetting(data)`     | `v1/business/get_setting`                | Lấy cài đặt doanh nghiệp   |
| `updateBusiness(data)`         | `v1/business/update_business`            | Cập nhật thông tin DN      |
| `saveSetting(data)`            | `v1/business/save_setting`               | Lưu cài đặt DN             |

---

## 📱 Tích Hợp Mobile App (WebView)

Ứng dụng hỗ trợ chạy embedded trong mobile app qua WebView với giao tiếp qua `postMessage`.

### Nhận Message từ Mobile

```typescript
// Event listener cho messages từ parent
window.addEventListener('message', handleMessage)

function handleMessage(event: MessageEvent) {
  const data =
    typeof event.data === 'string' ? JSON.parse(event.data) : event.data

  if (data?.type === 'page.token_chatbox') {
    // Nhận token từ mobile app
    getChatbotToken(data.payload?.token)
  }
}
```

### Gửi Message về Mobile

```typescript
// Quay lại màn login
window.parent.postMessage({ action: 'back_to_login' }, '*')

// Thông báo hoàn tất onboarding
window.ReactNativeWebView?.postMessage(
  JSON.stringify({
    type: 'page.home',
    message: {
      final: true,
      page_id: 'xxx',
      org_id: 'yyy',
    },
  }),
)
```

---

## 💾 Local Storage

Ứng dụng sử dụng localStorage để persist data giữa các sessions:

| Key              | Mô tả                                     |
| ---------------- | ----------------------------------------- |
| `current_step`   | Bước hiện tại trong onboarding            |
| `selected_data`  | JSON object chứa org_id, page_id, user_id |
| `business_info`  | JSON object chứa thông tin doanh nghiệp   |
| `is_setup`       | JSON object chứa flags trạng thái setup   |
| `merchant_token` | Token xác thực merchant                   |
| `chatbot_token`  | Token xác thực chatbot                    |

> ⚠️ **Lưu ý**: Khi có `merchant_token` trong localStorage (đã onboarding xong), ứng dụng sẽ clear toàn bộ localStorage và bắt đầu lại.

---

## 🎨 UI/UX Features

### Animations

- **Slide transitions**: Hiệu ứng slide-left khi tiến, slide-right khi lùi
- **Smooth transitions**: CSS transitions với duration 0.3s

### Responsive Design

- **Mobile-first**: Designed cho mobile với `max-w-md mx-auto`
- **Full viewport**: Sử dụng `h-dvh w-dvw` cho dynamic viewport height

### Color Scheme

- **Primary**: Blue-700 (`#1d4ed8`)
- **Background gradient**: `linear-gradient(to right, #fdefe3, #f3f4f3, #dce5ff)`
- **Success states**: Green
- **Error states**: Red-500

---

## 🚦 Scripts

| Script     | Command           | Mô tả                             |
| ---------- | ----------------- | --------------------------------- |
| Dev        | `pnpm dev`        | Chạy development server           |
| Build      | `pnpm build`      | Build production với type-check   |
| Build Only | `pnpm build-only` | Build production không type-check |
| Preview    | `pnpm preview`    | Preview production build          |
| Type Check | `pnpm type-check` | Kiểm tra TypeScript types         |
| Format     | `pnpm format`     | Format code với Prettier          |

---

## 🔧 Environment Variables

Ứng dụng sử dụng biến môi trường:

| Variable       | Mô tả                                     |
| -------------- | ----------------------------------------- |
| `VITE_APP_ENV` | Environment: `development` / `production` |

---

## 📦 Deployment

Ứng dụng được deploy trên **Vercel** với cấu hình:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 🔗 Luồng Dữ Liệu

```
┌──────────────────┐
│   Mobile App     │
│  (React Native)  │
└────────┬─────────┘
         │ postMessage (token_chatbox)
         ▼
┌──────────────────┐
│   Onboarding.vue │
│   (Main View)    │
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ Store │ │  API  │
│ Pinia │ │Service│
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌───────────────────┐     ┌──────────────────┐
│   localStorage    │     │   Backend APIs   │
│ (Persist State)   │     │ Chatbot/Merchant │
└───────────────────┘     └──────────────────┘
```

---

## 🐛 Debug Mode

Để debug trên PC mà không cần mobile app, uncomment mock token trong `Onboarding.vue`:

```typescript
// const MOCK_TOKEN = 'eyJhbGci...'
// getChatbotToken(MOCK_TOKEN)
```

---

## 📝 License

Private - Retify Platform

---

**Version**: 0.0.0  
**Last Updated**: 2024-12-21
