
const express = require('express');
const db = require('./db');
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/', (req, res) => {
    res.send(`Welcome to API server running at port ${PORT}!`);
});

app.get('/api/recipes', async (req, res) => {
    // logic to get recipes from database
    let recipes = await db("recipes").select();
    for(let recipe of recipes){
        recipe['ingredients'] = await db('ingredients')
            .select('id', 'name', 'amount')
            .where('ingredients.recipe_id', '=', recipe.id);
    }
    return res.json(recipes);
});

app.post('/api/recipes', async (req, res) => {
    // logic to initialize recipe in database
    await db("recipes").insert({
        'id': req.body.id,
        'name': req.body.name,
        'servings': req.body.servings,
        'cookTime': req.body.cookTime,
        'instructions': req.body.instructions});

    for (let ingredient of req.body.ingredients) {
        await db("ingredients").insert({
           'id': ingredient.id,
            'recipe_id': req.body.id,
            'name': ingredient.name,
            'amount': ingredient.amount,
        })
    }

    return res.json({'message': 'success'});
})

app.put('/api/recipes', async (req, res)=> {
    // Logic to update recipe in the database
    console.log(req.body);
    let ingredients = req.body.ingredients;
    delete req.body.ingredients;
    await db("recipes").insert(req.body).onConflict('id').merge();
    // console.log(req.body)
    for (let ingredient of ingredients) {
        ingredient['recipe_id'] = req.body.id;
        await db("ingredients").insert(ingredient).onConflict('id').merge();
        // console.log(ingredient);
    }
    return res.json({'message': 'success'});
})

app.delete('/api/recipes/:id', async (req, res)=> {
    // console.log(req.params.id);
    let result = await db('recipes').where({'id': req.params.id}).del('id');
    // console.log(result)
    return res.json(result)
})

// Serve client/build as static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// // Other URIs serve the frontend homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
})
