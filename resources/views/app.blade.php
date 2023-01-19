<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Trackagamitan</title>

    <link rel="shortcut icon" type="image/png" href="{{ URL::asset('img/logo.png') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/fontawesome.min.css') }} ">
    <link rel="stylesheet" href="{{ URL::asset('css/all.min.css') }} ">
    
    <!-- Vite -->
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
</head>


<body :class=" $store.darkMode.on && 'dark'" class="font-sans">
    @csrf
    <div id="app"></div>
    <script src="{{ URL::asset('js/jquery-3.6.0.min.js') }}"></script>

</body>

</html>