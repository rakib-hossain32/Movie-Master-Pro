# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
\



  const allMovies = [
  {
        1,
    title: "The Dark Knight",
    year: 2008,
    genre: "action",
    rating: 9.0,
    runtime: 152,
    votes: 2800000,
    poster: "https://images.unsplash.com/photo-1671198950247-2115f353699e",
    posterAlt: "Dark silhouette of Batman against Gotham City skyline with dramatic lighting",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      
  },
  {
        2,
    title: "Inception",
    year: 2010,
    genre: "sci-fi",
    rating: 8.8,
    runtime: 148,
    votes: 2400000,
    poster: "https://images.unsplash.com/photo-1582830309430-2b302a049f2f",
    posterAlt: "Surreal cityscape bending and folding in impossible geometric patterns representing dream layers",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      
  },
  {
        3,
    title: "Pulp Fiction",
    year: 1994,
    genre: "crime",
    rating: 8.9,
    runtime: 154,
    votes: 2100000,
    poster: "https://images.unsplash.com/photo-1555992337-27f220c610d0",
    posterAlt: "Retro diner scene with neon lighting and vintage aesthetic in noir style",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      
  },
  {
        4,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "drama",
    rating: 9.3,
    runtime: 142,
    votes: 2700000,
    poster: "https://images.unsplash.com/photo-1652676174621-c29ff9102391",
    posterAlt: "Prison courtyard with high walls and barbed wire under dramatic cloudy sky",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      
  },
  {
        5,
    title: "Interstellar",
    year: 2014,
    genre: "sci-fi",
    rating: 8.6,
    runtime: 169,
    votes: 1900000,
    poster: "https://images.unsplash.com/photo-1732513398308-4416a7873b6b",
    posterAlt: "Vast cosmic landscape with swirling galaxies and distant planets in deep space",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
     
  },
  {
        6,
    title: "The Godfather",
    year: 1972,
    genre: "crime",
    rating: 9.2,
    runtime: 175,
    votes: 1800000,
    poster: "https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546",
    posterAlt: "Elegant man in vintage suit sitting in ornate chair with dramatic shadows",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      
  },
  {
        7,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "action",
    rating: 8.4,
    runtime: 181,
    votes: 1600000,
    poster: "https://images.unsplash.com/photo-1525517148912-de786cce32cd",
    posterAlt: "Epic superhero team assembled in heroic poses with cosmic background and energy effects",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
     
  },
  {
        8,
    title: "Parasite",
    year: 2019,
    genre: "thriller",
    rating: 8.5,
    runtime: 132,
    votes: 900000,
    poster: "https://images.unsplash.com/photo-1630167008134-b9457c9de5d7",
    posterAlt: "Modern minimalist house with stark architectural lines and dramatic lighting contrasts",
    description: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
     
  },
  {
        9,
    title: "Forrest Gump",
    year: 1994,
    genre: "drama",
    rating: 8.8,
    runtime: 142,
    votes: 2200000,
    poster: "https://images.unsplash.com/photo-1734418053114-86d2299c2c01",
    posterAlt: "Man sitting on park bench with gentle smile and casual clothing in warm lighting",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      
  },
  {
        10,
    title: "The Matrix",
    year: 1999,
    genre: "sci-fi",
    rating: 8.7,
    runtime: 136,
    votes: 1900000,
    poster: "https://images.unsplash.com/photo-1713703060342-9cc48f3a745d",
    posterAlt: "Futuristic digital rain effect with green code cascading down black background",
    description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      
  },
  {
        11,
    title: "Goodfellas",
    year: 1990,
    genre: "crime",
    rating: 8.7,
    runtime: 146,
    votes: 1300000,
    poster: "https://images.unsplash.com/photo-1702362914975-bdc200cede52",
    posterAlt: "Group of men in vintage suits walking confidently down city street in retro style",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
      
  },
  {
        12,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "animation",
    rating: 8.4,
    runtime: 117,
    votes: 600000,
    poster: "https://images.unsplash.com/photo-1693304606966-ae2d2e13ed98",
    posterAlt: "Colorful animated spider character swinging through vibrant comic book style cityscape",
    description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions.",
    director: "Bob Persichetti, Peter Ramsey",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
     
  }]
  
  
  ;

  const movies = [
  {
       
    title: "The Dark Knight",
    year: 2008,
    genre: "action",
    rating: 9.0,
    runtime: 152,
    votes: 2800000,
    poster: "https://images.unsplash.com/photo-1671198950247-2115f353699e",
    posterAlt: "Dark silhouette of Batman against Gotham City skyline with dramatic lighting",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      
  },
  {
      
    title: "Inception",
    year: 2010,
    genre: "sci-fi",
    rating: 8.8,
    runtime: 148,
    votes: 2400000,
    poster: "https://images.unsplash.com/photo-1582830309430-2b302a049f2f",
    posterAlt: "Surreal cityscape bending and folding in impossible geometric patterns representing dream layers",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      
  },
  {
      
    title: "Pulp Fiction",
    year: 1994,
    genre: "crime",
    rating: 8.9,
    runtime: 154,
    votes: 2100000,
    poster: "https://images.unsplash.com/photo-1555992337-27f220c610d0",
    posterAlt: "Retro diner scene with neon lighting and vintage aesthetic in noir style",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      
  },
  {
       
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "drama",
    rating: 9.3,
    runtime: 142,
    votes: 2700000,
    poster: "https://images.unsplash.com/photo-1652676174621-c29ff9102391",
    posterAlt: "Prison courtyard with high walls and barbed wire under dramatic cloudy sky",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      
  },
  {
      
    title: "Interstellar",
    year: 2014,
    genre: "sci-fi",
    rating: 8.6,
    runtime: 169,
    votes: 1900000,
    poster: "https://images.unsplash.com/photo-1732513398308-4416a7873b6b",
    posterAlt: "Vast cosmic landscape with swirling galaxies and distant planets in deep space",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
     
  },
  {
       
    title: "The Godfather",
    year: 1972,
    genre: "crime",
    rating: 9.2,
    runtime: 175,
    votes: 1800000,
    poster: "https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546",
    posterAlt: "Elegant man in vintage suit sitting in ornate chair with dramatic shadows",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      
  },
  {
      
    title: "Avengers: Endgame",
    year: 2019,
    genre: "action",
    rating: 8.4,
    runtime: 181,
    votes: 1600000,
    poster: "https://images.unsplash.com/photo-1525517148912-de786cce32cd",
    posterAlt: "Epic superhero team assembled in heroic poses with cosmic background and energy effects",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
     
  },
  {
        
    title: "Parasite",
    year: 2019,
    genre: "thriller",
    rating: 8.5,
    runtime: 132,
    votes: 900000,
    poster: "https://images.unsplash.com/photo-1630167008134-b9457c9de5d7",
    posterAlt: "Modern minimalist house with stark architectural lines and dramatic lighting contrasts",
    description: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
     
  },
  {
       
    title: "Forrest Gump",
    year: 1994,
    genre: "drama",
    rating: 8.8,
    runtime: 142,
    votes: 2200000,
    poster: "https://images.unsplash.com/photo-1734418053114-86d2299c2c01",
    posterAlt: "Man sitting on park bench with gentle smile and casual clothing in warm lighting",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      
  },
  {
      
    title: "The Matrix",
    year: 1999,
    genre: "sci-fi",
    rating: 8.7,
    runtime: 136,
    votes: 1900000,
    poster: "https://images.unsplash.com/photo-1713703060342-9cc48f3a745d",
    posterAlt: "Futuristic digital rain effect with green code cascading down black background",
    description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      
  },
  {
      
    title: "Goodfellas",
    year: 1990,
    genre: "crime",
    rating: 8.7,
    runtime: 146,
    votes: 1300000,
    poster: "https://images.unsplash.com/photo-1702362914975-bdc200cede52",
    posterAlt: "Group of men in vintage suits walking confidently down city street in retro style",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
      
  },
  {
       
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "animation",
    rating: 8.4,
    runtime: 117,
    votes: 600000,
    poster: "https://images.unsplash.com/photo-1693304606966-ae2d2e13ed98",
    posterAlt: "Colorful animated spider character swinging through vibrant comic book style cityscape",
    description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions.",
    director: "Bob Persichetti, Peter Ramsey",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
     
  },

  
];



[
  {
      
    "title": "The Dark Knight",
    "year": 2008,
    "genre": "action",
    "rating": 9.0,
    "runtime": 152,
    "votes": 2800000,
    "poster": "https://images.unsplash.com/photo-1671198950247-2115f353699e",
    "posterAlt": "Dark silhouette of Batman against Gotham City skyline with dramatic lighting",
    "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    "director": "Christopher Nolan",
    "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
         
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"

  },
  {
      
    "title": "Inception",
    "year": 2010,
    "genre": "sci-fi",
    "rating": 8.8,
    "runtime": 148,
    "votes": 2400000,
    "poster": "https://images.unsplash.com/photo-1582830309430-2b302a049f2f",
    "posterAlt": "Surreal cityscape bending and folding in impossible geometric patterns representing dream layers",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "director": "Christopher Nolan",
    "cast": ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
         
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"
  },
  {
    
    "title": "Pulp Fiction",
    "year": 1994,
    "genre": "crime",
    "rating": 8.9,
    "runtime": 154,
    "votes": 2100000,
    "poster": "https://images.unsplash.com/photo-1555992337-27f220c610d0",
    "posterAlt": "Retro diner scene with neon lighting and vintage aesthetic in noir style",
    "description": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    "director": "Quentin Tarantino",
    "cast": ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
         
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"
  },
  {
   
    "title": "The Shawshank Redemption",
    "year": 1994,
    "genre": "drama",
    "rating": 9.3,
    "runtime": 142,
    "votes": 2700000,
    "poster": "https://images.unsplash.com/photo-1652676174621-c29ff9102391",
    "posterAlt": "Prison courtyard with high walls and barbed wire under dramatic cloudy sky",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "director": "Frank Darabont",
    "cast": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
         
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"
  },
  {
    
    "title": "Interstellar",
    "year": 2014,
    "genre": "sci-fi",
    "rating": 8.6,
    "runtime": 169,
    "votes": 1900000,
    "poster": "https://images.unsplash.com/photo-1732513398308-4416a7873b6b",
    "posterAlt": "Vast cosmic landscape with swirling galaxies and distant planets in deep space",
    "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "director": "Christopher Nolan",
    "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"
  },
  {
    
    "title": "The Godfather",
    "year": 1972,
    "genre": "crime",
    "rating": 9.2,
    "runtime": 175,
    "votes": 1800000,
    "poster": "https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546",
    "posterAlt": "Elegant man in vintage suit sitting in ornate chair with dramatic shadows",
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "director": "Francis Ford Coppola",
    "cast": ["Marlon Brando", "Al Pacino", "James Caan"],
         
    "language": "English",
    "country": "USA",
    "addedBy": "user1@gmail.com"
  },
  {
      
    "title": "Avengers: Endgame",
    "year": 2019,
    "genre": "action",
    "rating": 8.4,
    "runtime": 181,
    "votes": 1600000,
    "poster": "https://images.unsplash.com/photo-1525517148912-de786cce32cd",
    "posterAlt": "Epic superhero team assembled in heroic poses with cosmic background and energy effects",
    "description": "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    "director": "Anthony Russo, Joe Russo",
    "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
        
    "language": "English",
    "country": "USA",
    "addedBy":      "user1@gmail.com"
  },
  {
     
    "title": "Parasite",
    "year": 2019,
    "genre": "thriller",
    "rating": 8.5,
    "runtime": 132,
    "votes": 900000,
    "poster": "https://images.unsplash.com/photo-1630167008134-b9457c9de5d7",
    "posterAlt": "Modern minimalist house with stark architectural lines and dramatic lighting contrasts",
    "description": "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
    "director": "Bong Joon-ho",
    "cast": ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
        
    "language": "Korean",
    "country": "USA",
    "addedBy": "rakib@gmail.com"
  },
  {
     
    "title": "Forrest Gump",
    "year": 1994,
    "genre": "drama",
    "rating": 8.8,
    "runtime": 142,
    "votes": 2200000,
    "poster": "https://images.unsplash.com/photo-1734418053114-86d2299c2c01",
    "posterAlt": "Man sitting on park bench with gentle smile and casual clothing in warm lighting",
    "description": "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    "director": "Robert Zemeckis",
    "cast": ["Tom Hanks", "Robin Wright", "Gary Sinise"],
         
    "language": "English",
    "country": "USA",
    "addedBy": "shakib@gmail.com"
  },
  {
      
    "title": "The Matrix",
    "year": 1999,
    "genre": "sci-fi",
    "rating": 8.7,
    "runtime": 136,
    "votes": 1900000,
    "poster": "https://images.unsplash.com/photo-1713703060342-9cc48f3a745d",
    "posterAlt": "Futuristic digital rain effect with green code cascading down black background",
    "description": "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    "director": "Lana Wachowski, Lilly Wachowski",
    "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
         
    "language": "English",
    "country": "USA",
    "addedBy": "rakibulhasanmd678@gmail.com"
    ,
        "createAt": "2025-11-11T10:45:00Z"
  },
  {
     
    "title": "Goodfellas",
    "year": 1990,
    "genre": "crime",
    "rating": 8.7,
    "runtime": 146,
    "votes": 1300000,
    "poster": "https://images.unsplash.com/photo-1702362914975-bdc200cede52",
    "posterAlt": "Group of men in vintage suits walking confidently down city street in retro style",
    "description": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    "director": "Martin Scorsese",
    "cast": ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
         
    "language": "English",
    "country": "USA",
    "addedBy": "user1@gmail.com"
    ,
        "createAt": "2025-11-11T10:50:00Z"
  },
  {
      
    "title": "Spider-Man: Into the Spider-Verse",
    "year": 2018,
    "genre": "animation",
    "rating": 8.4,
    "runtime": 117,
    "votes": 600000,
    "poster": "https://images.unsplash.com/photo-1693304606966-ae2d2e13ed98",
    "posterAlt": "Colorful animated spider character swinging through vibrant comic book style cityscape",
    "description": "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions.",
    "director": "Bob Persichetti, Peter Ramsey",
    "cast": ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
        
    "language": "English",
    "country": "USA",
    "addedBy": "rakibulhasanmd678@gmail.com",
    "createAt": "2025-11-11T10:55:00Z"
  },
  
]



