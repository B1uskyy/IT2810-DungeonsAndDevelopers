
![Logo](https://www.pngkey.com/png/detail/374-3749117_png-file-svg-dnd-logo-png.png)


# Dungeon & Developers

An application to explore the various functionalities and mechanics of the popular roleplaying game Dungeons & Dragons. Where you can create your own character, explore the games classes, monsters, races and abilityscores!



## Run Locally

Clone the project

```bash
  git clone https://git.ntnu.no/IT2810-H24/T20-Project-2
```

Go to the frontend folder

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API 

#### Specifications

We use the D&D 5e API fetch the differend objects used for the page. It can be found here: https://www.dnd5eapi.co/

#### Endpoints for the API

All API URLs starts with *https://www.dnd5eapi.co/api/*


| Endpoint | Description                |
| :-------- | :------------------------- |
| `/monsters` |  Shows indexes of all monsters in game|
| `/classes` |  All clases with given indexes to do search |


#### Get item/class/monster

```http
  GET /api/${endpoint}/${index}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `index`      | `string` | **Required**. index of object to get |




## Authors

- [@matskva](https://git.ntnu.no/matskva)
- [@christgh](https://git.ntnu.no/christgh)
- [@eirikekv](https://git.ntnu.no/eirikekv)
- [@augustm](https://git.ntnu.no/augustm)



## License

[MIT](https://choosealicense.com/licenses/mit/)

