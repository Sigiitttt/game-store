const navListData = [
  {
    _id: 1,
    target: 'home',
    name: 'Home',
    icon: 'bi-house-door',
    active: true,
  },
  {
    _id: 2,
    target: 'categories', // ✅ PERBAIKAN: Harus 'categories' agar membuka halaman Categories
    name: 'Categories',
    icon: 'bi-window-stack',
    active: false,
  },
  {
    _id: 3,
    target: 'library',
    name: 'My Library',
    icon: 'bi-heart',
    active: false,
  },
  {
    _id: 4,
    target: 'bag',       // ✅ PERBAIKAN: Harus 'bag' agar membuka halaman Bag
    name: 'My Bag',
    icon: 'bi-bag',
    active: false,
  },
];

export default navListData;