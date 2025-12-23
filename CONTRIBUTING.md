# 🤝 Contributing Guide

## 📋 Coding Convention

### 1. Naming Convention

| Loại      | Convention       | Ví dụ                           |
| --------- | ---------------- | ------------------------------- |
| `const`   | SNAKE_CASE_UPPER | `const MAX_SIZE = 5 * 1024`     |
| `let`     | snake_case_lower | `let page_id = ''`              |
| Function  | PascalCase       | `function GetChatbotToken() {}` |
| Class     | PascalCase       | `class ChatbotServiceAPI {}`    |
| Interface | `I` + PascalCase | `interface IUser {}`            |
| Type      | `I` + PascalCase | `type IEnv = {...}`             |

### 2. React/Vue + TypeScript

```typescript
/** useState với generic type */
const [user_info, setUserInfo] = useState<IUser>({...})

/** State: snake_case_lower */
const business_info = ref<IBusinessInfo>({})

/** Setter: set + PascalCase */
const setBusinessInfo = (value: IBusinessInfo) => {...}
```

### 3. Comment Rules

- **Mỗi dòng code** phải có JSDoc comment `/** */`
- **Ngôn ngữ**: Tiếng Việt
- **Nội dung**: Giải thích rõ ràng từng dòng và logic

```typescript
/** Khởi tạo các giá trị lấy từ local */
function initData() {
  try {
    /** dữ liệu đã chọn ở local */
    const LOCAL_SELECTED_DATA = localStorage.getItem('selected_data')
    /** nếu có thì lưu vào store */
    if (LOCAL_SELECTED_DATA) {
      onBoardingStore.selected_data = JSON.parse(LOCAL_SELECTED_DATA)
    }
  } catch (e) {
    console.error(e)
  }
}
```

### 4. Format Rules

- Phá `{}` nếu code ngắn hơn
- Code rõ ràng, nhất quán
- Khi sửa code: **Giữ nguyên nghiệp vụ**, chỉ sửa format/comment/convention

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 8.x

### Installation

```bash
# Clone repository
git clone <repo-url>
cd retify-onboarding

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

---

## 📁 File Structure Guidelines

### Components

```
src/components/
├── common/           # Shared components (LinkAndQRCode, etc.)
├── icons/            # SVG icon components
└── ui/               # UI primitives (Button, Input, etc.)
```

### Views

```
src/views/
├── OnBoarding/       # Onboarding flow views
├── HomeView/         # Dashboard views
│   ├── order/        # Order management
│   ├── customer/     # Customer management
│   ├── conversation/ # Chat conversations
│   ├── report/       # Reports
│   └── setting/      # Settings
└── chat/             # Chat page
```

### API Services

```
src/api/
├── axios.ts          # Base Axios configuration
├── chatbot.ts        # Chatbot API endpoints
├── merchant.ts       # Merchant API endpoints
├── contact.ts        # Contact API endpoints
├── order.ts          # Order API endpoints
└── index.ts          # Export aggregator
```

---

## 🔄 Git Workflow

### Branch Naming

| Type    | Pattern                 | Example                |
| ------- | ----------------------- | ---------------------- |
| Feature | `feature/<description>` | `feature/add-payment`  |
| Bugfix  | `bugfix/<description>`  | `bugfix/fix-login`     |
| Hotfix  | `hotfix/<description>`  | `hotfix/crash-on-load` |

### Commit Messages

```
<type>(<scope>): <subject>

feat(onboarding): add business type selection
fix(api): handle token expiration
refactor(store): optimize state management
docs(readme): update installation guide
```

---

## 🧪 Testing

```bash
# Type checking
pnpm type-check

# Format code
pnpm format
```

---

## 📦 Build & Deploy

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Ứng dụng được tự động deploy lên **Vercel** khi push vào branch `main`.

---

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
