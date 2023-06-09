TEMPLE



  DESCRIPTION:  Es una APP de eventos musicales donde poder apuntarte a diferentes eventos y tambien comprar merch.


  BACKLOG FUNCIONALITIES: 

  -Mejora del apartado del merch.
  -Mejorar estilos.
  -Implementacion de musica.


  TECHNOLOGIES USED: 

  -Javascript
  
  -Postman

  -Node

  
   SERVER STRUCTURE:


   MODELS:

   EVENTS:

   image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,

  },

  location: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },

  gallery:{
    type: [String],
    default: []
    
  },

  afterMovie: {
    type: String,
    default: "Proximamente..."
    
  },

  djs: {
    type: [Schema.Types.ObjectId],
    ref: "Dj"
  },

  joinPeople: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
  },

  createdBy: {
    type: Schema.Types.ObjectId,
        ref: "User"
  }


  DJS: 
  
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

 
  LOCATION:


  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  address: {
    type: [Number],
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },



  PAYMENT:

   price: Number, 
  paymentIntentId: String, 
  clientSecret: String, 

  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },


  PRODUCT:

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },


  USER :

  username: {
      type: String,
      required: [true, "Nombre de usuario es requerido."],
    },
    email: {
      type: String,
      required: [true, "Email es requerido."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña es requerida."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },


    API ENDPOINTS (BACKEND ROUTES) :


    

  | Método | Ruta                           | Descripción                                            |
  |--------|--------------------------------|--------------------------------------------------------|
  | GET    | /api/auth/signup               | Registra al usuario                                    |
  | POST   | /api/auth/login                | Inicia sesión                                          |
  | GET    | /api/auth/verify               | Verifica quién es el usuario logueado                  |
  | GET    | /api/djs                       | Envía al frontend todos los DJs                        |
  | POST   | /api/djs                       | Recibe datos del frontend y crea un nuevo DJ en la BD  |
  | DELETE | /api/djs/:djId                 | Borra un DJ por su ID                                  |
  | GET    | /api/events                    | Envía al frontend la lista de todos los eventos        |
  | POST   | /api/events                    | Recibe detalles de un evento del frontend y            |
                                              lo crea en la BD                             
 
  | GET    | /api/events/:id                | Envía al frontend los detalles de un evento            |
  | DELETE | /api/events/:eventId           | Elimina un evento                                      |
  | PUT    | /api/events/:eventId           | Modifica un evento                                     |
  | GET    | /api/locations                 | Envía al frontend todas las ubicaciones                |
  | POST   | /api/locations                 | Recibe datos del frontend y crea una                   |
                                              nueva ubicación en la BD 
 
  | GET    | /api/locations/:locationId     | Envía al frontend una ubicación por su ID              |
  | DELETE | /api/locations/:locationId     | Borra una ubicación por su ID                          |
  | PUT    | /api/locations/:locationId     | Edita una ubicación por su ID                          |
  | GET    | /api/products                  | Envía al frontend todos los productos                  |
  | POST   | /api/products                  | Recibe datos del frontend y crea un nuevo              |
                                              producto en la BD 

  | DELETE | /api/products/:productId       | Borra un producto por su ID                            | 
  | PUT    | /api/products/:productId       | Actualiza un producto por su ID                        |
  | POST   | /api/upload/image              | Sube una imagen única a Cloudinary                     |
  | POST   | /api/upload/video              | Sube un video a Cloudinary                             |
  | POST   | /api/upload/multiple-image     | Sube múltiples imágenes a Cloudinary                   |

  
  

   COLLABORATORS:

   -Alvero Martinez

   -Jonatan Iglesias


   PROJECT:

   REPOSITORY LINK CLIENT: https://github.com/AlvaroSapata/Temple-Client

   REPOSITORY LINK SERVER: https://github.com/AlvaroSapata/Temple-Server

   DEPLOY LINK: https://templewav.netlify.app/


   SLIDES: https:

   SLIDES LINK:   https://www.canva.com/design/DAFlUt7352c/4C_0TuI3PdvdAwYS3nGefg/edit?utm_content=DAFlUt7352c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
   