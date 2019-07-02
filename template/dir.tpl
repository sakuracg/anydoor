<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
      a{
        display:block;
        line-height: 25px;
      }
    </style>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>  <!--<img src="{{icon}}"/>this为当前模块下的文件名-->
  {{/each}}
</body>
</html>