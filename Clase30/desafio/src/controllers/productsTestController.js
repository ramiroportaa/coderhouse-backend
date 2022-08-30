import { faker } from '@faker-js/faker';
faker.locale = "es";

const fakerTest = (req, res)=>{
    const products = [];
    for (let index = 0; index < 5; index++) {
        const obj = {};
        obj.id = products[products.length-1]?.id + 1 || 1;
        obj.title = faker.commerce.productName();
        obj.price = faker.commerce.price(100);
        obj.thumbnail = faker.image.fashion(400,400, true);
        products.push(obj);
    }
    res.status(404).render("productsTemplate.ejs", {products});
}

export default {fakerTest};