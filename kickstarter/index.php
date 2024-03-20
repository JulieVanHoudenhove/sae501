<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <!-- TAILWIND -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        cooper: ['Cooper', 'sans-serif'],
                        poppins: ['Poppins Sans', 'sans-serif']
                    },
                    colors: {
                        cream: '#FAF5F1',
                        dark: '#424242',
                        pink: '#E781AC',
                    },
                }
            }
        }
    </script>
    <!-- SWIPER -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>*

    <title>Kickstarter</title>
</head>

<?php
$data = 'contribution.json';
if (file_exists($data)) {
    $data = file_get_contents($data);
    $contributions = json_decode($data);
}
?>

<body class="bg-cream overflow-x-hidden">
    <header class="flex justify-center items-center my-10">
        <h2 class="font-cooper text-6xl text-dark">funder.</h2>
    </header>
    <section class="mx-28">
        <img src="images/site.png">
        <div class="relative mt-12 flex items-center h-16">
            <div class="absolute bg-white h-16 w-full shadow-[0_13px_22px_0_rgba(0,0,0,0.10)]"></div>
            <div class="absolute bg-pink h-16 w-[800px]"></div>
            <p class="absolute text-white font-cooper text-[54px] mx-4">58<span class="font-cooper text-[32px]">%</span></p>
        </div>
    </section>
    <section class="m-28 flex gap-44">
        <div class="flex flex-col gap-12 w-1/2">
            <h1 class="font-cooper text-5xl text-dark">Changer de regard avec<br>notre technologie 3D</h1>
            <p class="text-dark">Avez-vous déjà ressenti la frustration de ne pas trouver la paire parfaite de lunettes chez l'opticien ? Nous
                aussi. C'est pourquoi nous avons décidé de changer les règles du jeu. Notre équipe passionnée a développé une
                solution révolutionnaire pour mettre fin à cette expérience décevante. Bienvenue dans le futur de l'optique !
            </p>
        </div>
        <div class="w-1/2 flex flex-col gap-7 justify-end">
            <div class="flex gap-14">
                <div class="flex flex-col gap-3">
                    <p class="text-pink font-cooper text-5xl">100 000<span class="font-cooper text-3xl">€</span></p>
                    <p class="text-dark font-poppins text-[22px]">est notre objectif</p>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="text-pink font-cooper text-5xl">58<span class="font-cooper text-3xl">%</span></p>
                    <p class="text-dark font-poppins text-[22px]">financés</p>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="text-pink font-cooper text-5xl">21</p>
                    <p class="text-dark font-poppins text-[22px]">jours restants</p>
                </div>
            </div>
            <button class="text-white font-bold bg-pink w-full py-3 text-xl">Participer</button>
            <div class="flex text-dark items-center justify-end gap-5">
                <p class="text-dark text-xl">Partager</p>
                <div class="flex gap-5">
                    <i class="fa-brands fa-facebook text-2xl"></i>
                    <i class="fa-brands fa-instagram text-2xl"></i>
                    <i class="fa-brands fa-twitter text-2xl"></i>
                    <i class="fa-brands fa-whatsapp text-2xl"></i>
                </div>
            </div>
        </div>
    </section>
    <section class="m-28">
        <!-- Slider main container -->
        <div class="swiper contributionsSwiper overflow-visible">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <?php
                foreach ($contributions as $contribution) {
                    echo '
                            <div class="swiper-slide bg-white shadow-[0_0_43px_0_rgba(0,0,0,0.1)] !w-[425px] h-[750px] p-8 flex flex-col justify-between">
                                <div class="flex flex-col gap-9">
                                    <div class="flex flex-col gap-1 items-center">
                                        <p class="font-cooper text-[32px] text-center text-dark">' . $contribution->name . '</p>
                                        <p class="font-cooper text-pink text-2xl">' . $contribution->price . '</p>
                                        <p class="text-xl text-dark">' . $contribution->contributions . '</p>
                                    </div>
                                    <div class="flex flex-col gap-5 text-dark">
                                        ' . $contribution->rewards . '
                                        <p class="text-dark text-base">' . $contribution->comment . '</p>
                                    </div>
                                </div>
                                <button class="text-white font-bold bg-pink w-full py-3 text-xl">Contribuer</button>
                            </div>
                        ';
                }
                ?>
            </div>
        </div>
    </section>
    <!-- FONTAWESOME -->
    <script src="https://kit.fontawesome.com/a4b141eee2.js" crossorigin="anonymous"></script>
    <!-- SWIPER -->
    <script type="module">
        import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

        const swiper = new Swiper(".contributionsSwiper", {
            slidesPerView: 'auto',
            spaceBetween: 30,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
            },
        })
    </script>
</body>

</html>