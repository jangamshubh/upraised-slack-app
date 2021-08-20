module.exports = {
    HOST: "ec2-52-3-130-181.compute-1.amazonaws.com",
    USER: "cugnupexqgfgxm",
    PASSWORD: "41a8b247655bae6d6c4e81f6530afcdd583949d0819e9d2217be6a54235228b8",
    DB: "d5oi2blasuobi3",
    dialect: "postgres",
    PORT: "5432",
    SSL:true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};