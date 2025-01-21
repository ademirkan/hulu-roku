# 👋 Welcome to My Take-Home Project!
Live Demo: [https://hulu-roku-arif.vercel.app/](https://hulu-roku-arif.vercel.app/)

---

## ✅ Features Implemented
- [x] **Interactable Carousel** 
- [x] **Animations**
- [x] **Skeleton UI** 
- [x] **Dynamic / Lazy Loading**
- [x] **Partial Pre-rendering**

---

## ✨ Design Decisions
1. **Image Error Handling**  
   In cases where an image fails to load, the associated card is removed entirely.

2. **StaticCollection and DynamicCollection Components**  
   To adhere to the **Single Responsibility Principle**, I created two separate components:
   - **StaticCollection**: Renders sets without refId (images already populated).
   - **DynamicCollection**: Fetches set from API, displays a skeleton during loading, and then renders StaticCollection.
   This centralizes the UI in one component, while encapsulating the fetch / skeleton logic in the other.

3. **Lazy Loading**  
   Images are only rendered when they come into the viewport, improving performance and reducing initial page load time.

4. **Server-Side Rendering (SSR)**  
   Static components like the **navbar** are pre-rendered on the server for faster load times. Skeleton UI is displayed initially for collections to improve perceived performance during data fetching. However, with scaleability in mind, I decided against SSR for the StaticCollection and DynamicCollection components, as fetching from the /sets/ API, as it would place too much of a burden on the servers without much tangible benefit.

---

## 🚧 Even more improvements...
- [ ] **Prefetching images before they come into view**
- [ ] **Lazily fetching /sets/ before they come into view**
- [ ] **Responsive Design** 
- [ ] **Accessibility (a11y)** 
- [ ] **Modal Component**

---

## 📦 Run Locally
```bash
# Clone the repository
git clone git@github.com:ademirkan/hulu-roku.git

# Navigate to the project directory
cd hulu-roku

# Install dependencies
npm install

# Start the development server
npm run dev
