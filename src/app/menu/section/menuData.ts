export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number; // in INR
  category: (typeof CATEGORIES)[number];
  image?: string;
  alt?: string;
};

export const CATEGORIES = ["Shawarma", "Wraps", "Sides", "Drinks"] as const;

export const MENU: MenuItem[] = [
  {
    id: "classic-chicken",
    name: "Classic Chicken Shawarma",
    desc: "Juicy marinated chicken, fresh vegetables and our signature garlic sauce, wrapped to perfection.",
    price: 149,
    category: "Shawarma",
    image: "/image/sig/img1.jpg",
    alt: "Classic chicken shawarma wrap",
  },
  {
    id: "peri-peri",
    name: "Spicy Peri Peri Shawarma",
    desc: "Flame-grilled chicken tossed in bold peri peri spices with creamy sauce and crunchy vegetables.",
    price: 169,
    category: "Shawarma",
    image: "/image/sig/img2.jpg",
    alt: "Spicy peri peri chicken shawarma",
  },
  {
    id: "wrapz-special",
    name: "WRAPZ Special Shawarma",
    desc: "Our signature creation loaded with seasoned chicken, special sauces and irresistible flavours.",
    price: 199,
    category: "Shawarma",
    image: "/image/sig/img3.jpg",
    alt: "WRAPZ special loaded shawarma",
  },
  {
    id: "cheesy-chicken",
    name: "Cheesy Chicken Shawarma",
    desc: "Tender chicken, melted cheese, fresh vegetables and a rich creamy sauce in every bite.",
    price: 179,
    category: "Shawarma",
    image: "/image/sig/img4.jpg",
    alt: "Cheesy chicken shawarma",
  },
  {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    desc: "Crisp golden falafel, hummus, pickles and fresh greens in warm flatbread.",
    price: 129,
    category: "Wraps",
    image: "/image/menu/65275.webp",
    alt: "Crisp golden falafel wrap",
  },
  {
    id: "hummus-veg-wrap",
    name: "Hummus Veggie Wrap",
    desc: "Creamy hummus, grilled vegetables and garlic toum, rolled tight.",
    price: 119,
    category: "Wraps",
    image: "/image/menu/65276.webp",
    alt: "Hummus veggie wrap",
  },
  {
    id: "garlic-toum",
    name: "Garlic Toum Dip",
    desc: "Our velvety signature garlic sauce, made in small batches.",
    price: 30,
    category: "Sides",
    image: "/image/menu/65277.webp",
    alt: "Garlic toum dip",
  },
  {
    id: "crispy-fries",
    name: "Crispy Fries",
    desc: "Golden, salted and best shared. Pairs perfectly with toum.",
    price: 89,
    category: "Sides",
    image: "/image/menu/65278.webp",
    alt: "Crispy fries",
  },
  {
    id: "pickle-cup",
    name: "Pickle Cup",
    desc: "Tangy pickled gherkins and turnip, the classic shawarma sidekick.",
    price: 40,
    category: "Sides",
    image: "/image/menu/65279.webp",
    alt: "Pickle cup",
  },
  {
    id: "mint-lemonade",
    name: "Mint Lemonade",
    desc: "Fresh lime, cool mint and just enough sweetness.",
    price: 69,
    category: "Drinks",
    image: "/image/menu/64992.webp",
    alt: "Mint lemonade",
  },
  {
    id: "lime-soda",
    name: "Fresh Lime Soda",
    desc: "Sweet, salted or mixed, served ice cold.",
    price: 59,
    category: "Drinks",
    image: "/image/menu/64994.webp",
    alt: "Fresh lime soda",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

