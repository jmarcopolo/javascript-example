var typeorm = require("typeorm");

typeorm.createConnection({
    driver: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "admin",
        database: "test"
    },
    entitySchemas: [
        require("./entity/Post"),
        require("./entity/Category")
    ],
    autoSchemaSync: true
}).then(function (connection) {

    var category1 = {
        name: "TypeScript"
    };
    var category2 = {
        name: "Programming"
    };

    var post = {
        title: "Control flow based type analysis",
        text: "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.",
        categories: [
            category1, category2
        ]
    };

    var postRepository = connection.getRepository("Post");
    postRepository.persist(post)
        .then(function(savedPost) {
            console.log("Post has been saved: ", savedPost);
            console.log("Now lets load all posts: ");

            return postRepository.find();
        })
        .then(function(allPosts) {
            console.log("All posts: ", allPosts);
        });


}).catch(function(error) {
    console.log("Error: ", error);
});