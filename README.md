# React one page blog template

This is a layout for a blog site fully developed with react. Using markdown format to writing posts and JSON formats to mapping posts to menus.

## How to add items to main menu

All main items in `./public/data/posts/index.json` file.

```
{
	"items":{
		"react":{
			"icon":"react",
			"title":"React JS",
			"description":"React JS is a modern and powerfull MVC frontend framework."
		},
		"laravel":{
			"icon":"laravel",
			"title":"Laravel",
			"description":"Laravel is a highly performanced MVC framework developed with PHP."
		}
	}
}
```

Copy your main item icon to `./public/data/resources/menuIcons` and put the name to the value of `icon` key. You can add indexes for any subfolders in `./public/data/posts/` directory to map contents in the menu. In above JSON `laravel`,`react` keys are name of the sub directories in `./public/data/posts/` directory. Sub index files not taking the `icon` key. So you can not set icons for sub items.

You can add meta informations to posts. If you have a post like `/public/data/posts/react/beginner/first.md` , you can create a file with the path `/public/data/meta/posts/react/beginner/first.json` to add meta informations of the post.

This is a sample meta file.

```

{
	"time":"2019-04-05 22:34:00",
	"next":{
		"title":"Next Page",
		"link":"/post/react/beginner/second"
	},
	"previous":{
		"title":"Previous Page",
		"link":"/post/react/beginner/start"
	},
	"writers":[
		{
			"name":"WhizSid",
			"username":"whizsid",
			"avatar":"whizsid.png"
		}
	],
	"seeAlso":[
		{
			"title":"Second Page",
			"link":"/post/react/beginner/start"
		}
	]
}

```
