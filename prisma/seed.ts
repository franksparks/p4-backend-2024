import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Libraries
  const libraryOne = await prisma.library.create({
    data: {
      name: "Library One",
      city: "Barcelona",
      address: "Plaça Lesseps",
    },
  });
  const libraryTwo = await prisma.library.create({
    data: {
      name: "Library Two",
      city: "Madrid",
      address: "Plaza Callao",
    },
  });
  const libraryThree = await prisma.library.create({
    data: {
      name: "Library Three",
      city: "Manzanares",
      address: "Plaza de la Divina Pastora",
    },
  });
  const libraryFour = await prisma.library.create({
    data: {
      name: "Library Four",
      city: "Vitoria",
      address: "Plaza de la Virgen Blanca",
    },
  });
  const libraryFive = await prisma.library.create({
    data: {
      name: "Library five",
      city: "Santiago de Compostela",
      address: "Plaza del Obradoiro",
    },
  });

  console.log(
    "Libraries created:",
    libraryOne,
    libraryTwo,
    libraryThree,
    libraryFour,
    libraryFive
  );

  //Authors
  const authorOne = await prisma.author.create({
    data: {
      name: "Terry",
      lastName: "Pratchett",
      birthPlace: "BeaconsField, UK",
    },
  });
  const authorTwo = await prisma.author.create({
    data: {
      name: "Philip",
      lastName: "K. Dick",
      birthPlace: "Chicago, USA",
    },
  });
  const authorThree = await prisma.author.create({
    data: {
      name: "Ursula",
      lastName: "K. Le Guin",
      birthPlace: "Berkeley, USA",
    },
  });
  const authorFour = await prisma.author.create({
    data: {
      name: "Isaac",
      lastName: "Asimov",
      birthPlace: "Petrovichi, Russia",
    },
  });
  const authorFive = await prisma.author.create({
    data: {
      name: "Frank",
      lastName: "Herbert",
      birthPlace: "Tacoma, USA",
    },
  });

  console.log(
    "Authors added:",
    authorOne,
    authorTwo,
    authorThree,
    authorFour,
    authorFive
  );

  // Affiliates
  const affiliateOne = await prisma.affiliate.create({
    data: {
      name: "One",
      lastName: "Affiliate_1",
      email: "aff__1__@library.com",
      city: "Barcelona",
      address: "Gran de Gràcia, 1",
      libraryId: 1,
    },
  });
  const affiliateTwo = await prisma.affiliate.create({
    data: {
      name: "Two",
      lastName: "Affiliate_2",
      email: "aff__2__@library.com",
      city: "Madrid",
      address: "Fuencarral, 23",
      libraryId: 2,
    },
  });
  const affiliateThree = await prisma.affiliate.create({
    data: {
      name: "Three",
      lastName: "Affiliate_3",
      email: "aff__3__@library.com",
      city: "Manzanares",
      address: "Libertad, 23",
      libraryId: 3,
    },
  });
  const affiliateFour = await prisma.affiliate.create({
    data: {
      name: "Four",
      lastName: "Affiliate_4",
      email: "aff__4__@library.com",
      city: "Vitoria",
      address: "Plaza de la Virgen Blanca, 3",
      libraryId: 4,
    },
  });
  const affiliateFive = await prisma.affiliate.create({
    data: {
      name: "Five",
      lastName: "Affiliate_5",
      email: "aff__5__@library.com",
      city: "Santiago de Compostela",
      address: "Praza da Inmaculada, 5",
      libraryId: 5,
    },
  });
  const affiliateSix = await prisma.affiliate.create({
    data: {
      name: "Six",
      lastName: "Affiliate_6",
      email: "aff__6__@library.com",
      city: "Barcelona",
      libraryId: 1,
    },
  });
  const affiliateSeven = await prisma.affiliate.create({
    data: {
      name: "Seven",
      lastName: "Affiliate_7",
      email: "aff__7__@library.com",
      city: "Madrid",
      libraryId: 2,
    },
  });
  const affiliateEight = await prisma.affiliate.create({
    data: {
      name: "Eight",
      lastName: "Affiliate_8",
      email: "aff__8__@library.com",
      city: "Manzanares",
      libraryId: 3,
    },
  });
  const affiliateNine = await prisma.affiliate.create({
    data: {
      name: "Nine",
      lastName: "Affiliate_9",
      email: "aff__9__@library.com",
      city: "Vitoria",
      libraryId: 4,
    },
  });
  const affiliateTen = await prisma.affiliate.create({
    data: {
      name: "Ten",
      lastName: "Affiliate_10",
      email: "aff__10__@library.com",
      city: "Santiago de Compostela",
      libraryId: 5,
    },
  });
  console.log(
    "Affiliates added:",
    affiliateOne,
    affiliateTwo,
    affiliateThree,
    affiliateFour,
    affiliateFive,
    affiliateSix,
    affiliateSeven,
    affiliateEight,
    affiliateNine,
    affiliateTen
  );

  // Books
  const bookOne = await prisma.book.create({
    data: {
      title: "El color de la magia",
      pages: 101,
      authorId: 1,
      libraryId: 1,
    },
  });
  const bookTwo = await prisma.book.create({
    data: {
      title: "La luz fantástica",
      pages: 102,
      available: false,
      authorId: 1,
      libraryId: 2,
    },
  });
  const bookThree = await prisma.book.create({
    data: {
      title: "Ritos Iguales",
      pages: 103,
      authorId: 1,
      libraryId: 3,
    },
  });
  const bookFour = await prisma.book.create({
    data: {
      title: "Mort",
      pages: 104,
      authorId: 1,
      libraryId: 4,
    },
  });
  const bookFive = await prisma.book.create({
    data: {
      title: "Rechicero",
      pages: 105,
      authorId: 1,
      libraryId: 5,
    },
  });
  const bookSix = await prisma.book.create({
    data: {
      title: "Ubik",
      pages: 201,
      available: false,
      authorId: 2,
      libraryId: 1,
    },
  });
  const bookSeven = await prisma.book.create({
    data: {
      title: "Sueñan los androides con ovejas eléctricas?",
      pages: 202,
      authorId: 2,
      libraryId: 2,
    },
  });
  const bookEight = await prisma.book.create({
    data: {
      title: "Los tres estigmas de Palmer Eldritch",
      pages: 203,
      authorId: 2,
      libraryId: 3,
    },
  });
  const bookNine = await prisma.book.create({
    data: {
      title: "Fluyan mis lágrimas, dijo el policía",
      pages: 204,
      authorId: 2,
      libraryId: 4,
    },
  });
  const bookTen = await prisma.book.create({
    data: {
      title: "Podemos recordarlo por usted",
      pages: 205,
      authorId: 2,
      libraryId: 5,
    },
  });
  const bookEleven = await prisma.book.create({
    data: {
      title: "Terramar 1 - Un mago de Terramar",
      pages: 301,
      authorId: 3,
      libraryId: 1,
    },
  });
  const bookTwelve = await prisma.book.create({
    data: {
      title: "Terramar 2 - Las tumbas de Atuan",
      pages: 302,
      authorId: 3,
      libraryId: 2,
    },
  });
  const bookThirteen = await prisma.book.create({
    data: {
      title: "Terramar 3 - La costa más lejana",
      pages: 303,
      authorId: 3,
      libraryId: 3,
    },
  });
  const bookFourteen = await prisma.book.create({
    data: {
      title: "Terramar 4 - Tehanu",
      pages: 304,
      authorId: 3,
      libraryId: 4,
    },
  });
  const bookFifteen = await prisma.book.create({
    data: {
      title: "Terramar 5 - En el otro viento",
      pages: 305,
      available: false,
      authorId: 3,
      libraryId: 5,
    },
  });
  const bookSixteen = await prisma.book.create({
    data: {
      title: "Fundación",
      pages: 401,
      available: false,
      authorId: 4,
      libraryId: 1,
    },
  });
  const bookSeventeen = await prisma.book.create({
    data: {
      title: "Fundación e imperio",
      pages: 402,
      authorId: 4,
      libraryId: 2,
    },
  });
  const bookEigthteen = await prisma.book.create({
    data: {
      title: "Segunda fundación",
      pages: 403,
      authorId: 4,
      libraryId: 3,
    },
  });
  const bookNineteen = await prisma.book.create({
    data: {
      title: "Los límites de la fundación",
      pages: 405,
      authorId: 4,
      libraryId: 4,
    },
  });
  const bookTwenty = await prisma.book.create({
    data: {
      title: "Fundación y Tierra",
      pages: 405,
      authorId: 4,
      libraryId: 5,
    },
  });
  const bookTwentyOne = await prisma.book.create({
    data: {
      title: "Dune",
      pages: 501,
      available: false,
      authorId: 5,
      libraryId: 1,
    },
  });
  const bookTwentyTwo = await prisma.book.create({
    data: {
      title: "El mesías de Dune",
      pages: 502,
      authorId: 5,
      libraryId: 2,
    },
  });
  const bookTwentyThree = await prisma.book.create({
    data: {
      title: "Hijos de Dune",
      pages: 503,
      authorId: 5,
      libraryId: 3,
    },
  });
  const bookTwentyFour = await prisma.book.create({
    data: {
      title: "Dios emperador de Dune",
      pages: 504,
      authorId: 5,
      libraryId: 4,
    },
  });
  const bookTwentyFive = await prisma.book.create({
    data: {
      title: "Herejes de Dune",
      pages: 505,
      authorId: 5,
      libraryId: 5,
    },
  });

  console.log(
    "Books added:",
    bookOne,
    bookTwo,
    bookThree,
    bookFour,
    bookFive,
    bookSix,
    bookSeven,
    bookEight,
    bookNine,
    bookTen,
    bookEleven,
    bookTwelve,
    bookThirteen,
    bookFourteen,
    bookFifteen,
    bookSixteen,
    bookSeventeen,
    bookEigthteen,
    bookNineteen,
    bookTwenty,
    bookTwentyOne,
    bookTwentyTwo,
    bookTwentyThree,
    bookTwentyFour,
    bookTwentyFive
  );

  //Borrowings
  const borrowOne = await prisma.borrowing.create({
    data: {
      active: false,
      affiliateId: 1,
      bookId: 11,
    },
  });
  const borrowTwo = await prisma.borrowing.create({
    data: {
      active: false,
      affiliateId: 1,
      bookId: 12,
    },
  });
  const borrowThree = await prisma.borrowing.create({
    data: {
      active: false,
      affiliateId: 1,
      bookId: 13,
    },
  });
  const borrowFour = await prisma.borrowing.create({
    data: {
      active: false,
      affiliateId: 1,
      bookId: 14,
    },
  });
  const borrowFive = await prisma.borrowing.create({
    data: {
      affiliateId: 1,
      bookId: 15,
    },
  });
  const borrowSix = await prisma.borrowing.create({
    data: {
      active: false,
      affiliateId: 2,
      bookId: 1,
    },
  });
  const borrowSeven = await prisma.borrowing.create({
    data: {
      affiliateId: 2,
      bookId: 2,
    },
  });
  const borrowEight = await prisma.borrowing.create({
    data: {
      affiliateId: 3,
      bookId: 6,
    },
  });
  const borrowNine = await prisma.borrowing.create({
    data: {
      affiliateId: 4,
      bookId: 16,
    },
  });
  const borrowTen = await prisma.borrowing.create({
    data: {
      affiliateId: 5,
      bookId: 21,
    },
  });

  console.log(
    "Borrowings added:",
    borrowOne,
    borrowTwo,
    borrowThree,
    borrowFour,
    borrowFive,
    borrowSix,
    borrowSeven,
    borrowEight,
    borrowNine,
    borrowTen
  );
}

main();
