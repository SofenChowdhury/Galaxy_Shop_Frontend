<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv='cache-control' content='no-cache'>
        <meta http-equiv='expires' content='0'>
        <meta http-equiv='pragma' content='no-cache'>
        <title inertia>{{ config('app.name', 'Hyundai - App') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css" />
     
        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">

        <!-- Scripts -->
        @routes
        <script src="{{ asset(mix('js/app.js')) }}" defer></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        @env ('local')
            {{-- <script src="http://localhost:8080/js/bundle.js"></script> --}}
        @endenv

        <script  src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" defer></script>
        <script src="{{asset('assets/js/charts-lines.js')}}" defer></script>
        <script src="{{asset('assets/js/charts-pie.js')}}" defer></script>

    </body>
</html>
