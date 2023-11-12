use cloud;

db.createCollection("users");

db.createCollection("documents");

db.createCollection("carpetas");

db.createCollection("compartidos");

//insert user empleado
db.users.insertOne(
    {
        name: "Maria",
        username: "mary",
        password: "1234",
        admin: false,
        deleted: false,

    }
)

//insert user admin

db.users.insertOne(
    {
        name: "Estuardo",
        username: "estuardo",
        password: "1234",
        admin: true,
        deleted: false,

    }
)



//insert carpeta
db.carpetas.insertOne({
	nombre: "Juegos",
	raiz: "usuario1",
	creador: "usuario1",
	fecha: new Date(),
	deleted: false
})

//insert documents
db.carpetas.insertOne({
	nombre: "docP",
    tipo: ".txt",
	raiz: "usuario1",
	creador: "usuario1",
	fecha: new Date(),
    nombre: "hola que hace",
	deleted: false
})

//insert documents
db.carpetas.insertOne({
	nombre: "amigos",
    tipo: ".txt",
	creador: "usuario2",
    compartido: "usuario1",
	fecha: new Date(),
    nombre: "solo para amigos",
	deleted: false
})