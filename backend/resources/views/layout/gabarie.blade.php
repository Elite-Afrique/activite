<!DOCTYPE html>
<html lang="fr">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JV4Z8HKH4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1JV4Z8HKH4');
</script>
  
  <base href=" " />
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="keywords" content=" " />

  <!-- Favicons -->
    <!-- <link href="{{ asset('assets/img/articles/favicon.png')  }}" rel="icon"> -->
  <!-- <link href="{{ asset('assets/img/apple-touch-icon.png')  }}" rel="apple-touch-icon"> -->

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{ asset('assets/vendor/bootstrap/css/bootstrap.min.css')  }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')  }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/boxicons/css/boxicons.min.css')  }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/glightbox/css/glightbox.min.css')  }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/remixicon/remixicon.css')  }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/swiper/swiper-bundle.min.css')  }}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{ asset('assets/css/style.css')  }}" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">

  <!-- =======================================================
  * Template Name: Tempo - v4.5.0
  * Template URL: https://bootstrapmade.com/tempo-free-onepage-bootstrap-theme/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>
<style>
    .menu a{
        color:#dd163b;
    }
</style>
<body style="background-color:#E8E9F9">

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center justify-content-between">

      <nav id="navbar" class="navbar">
        <ul class="menu" style="">
          <li><a class="nav-link scrollto" href=" " > Acceuil</a></li>
          <li><a class="nav-link scrollto" href=" "> Contact</a></li>
          <li><a class="nav-link scrollto" href="/login">Connexion <i align="left" style="width: 20px;" class="bx bx-user  "></i></a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!--End .navbar -->

    </div>
  </header><!-- End Header -->

  <main id="main">
    
  @yield("contenu")

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h3>structure</h3>
            <p>
              Nagrin, Secteur 30 <br>
              Ouagadougou, Arrondissement 07<br>
              Burkina Faso <br><br>
              <strong>Telephone:</strong> <a href="tel:+22673203135">+226 73203135</a> / <a href="tel:+22675632972">+226 75632972</a><br>
              <strong>Email:</strong> <a href="mailto:">info@structure.com</a><br>
            </p>
          </div>


          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Newsletter</h4>
            <p>Abonnez vous a notre newsletter et recevez des informations en temps reel sur nos offres et promotions.</p>
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="S'inscrir" placeholder="email">
            </form>
            <!-- MultiTrans Start -->
            <br>
            <div id='trans'>
                <div id="google_translate_element" onclick="transman('2','mtrans_2d3181','fr','.eservicessa.com');"></div>
                <script type="text/javascript">
                    function googleTranslateElementInit() {
                        new google.translate.TranslateElement({
                        pageLanguage: "fr",
                        includedLanguages:"fr,en,da,sv,no,is,fi,ca,cy,ga,de,gl,nl,eu,it,es,pt,",
                    layout: google.translate.TranslateElement.InlineLayout.VERTICAL
                  }, "google_translate_element");
                }
                </script>
                <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
            </div>
            <!-- MultiTrans End -->
          </div>

        </div>
      </div>
      
     </div>
    </div>

    <div class="container d-md-flex py-4">

      <div class="me-md-auto text-center text-md-start">
        <div class="copyright">
          &copy; Copyright <strong><span>structure</span></strong>. Tout droits reserves
        </div>
        <div class="credits">
          <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/tempo-free-onepage-bootstrap-theme/ -->
          Developpe par <a href="">structure</a>
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="" class="whatsapp"><i class="bx bxl-whatsapp"></i></a>
        <a href="" class="envelope"><i class="bx bx-envelope "></i></a>
        <a href="tel:+22675632972" class="phone"><i class="bx bxs-phone "></i></a>
        
        
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-start"><i class="bi bi-arrow-up-short"></i></a>
  <!-- <a href="#" class="back-to-top d-flex align-items-end justify-content-center"><i class="bx bxl-whatsapp"></i></a> -->

  <script src="{{ asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js')  }}"></script>
  <script src="{{ asset('assets/vendor/glightbox/js/glightbox.min.js')  }}"></script>
  <script src="{{ asset('assets/vendor/isotope-layout/isotope.pkgd.min.js')  }}"></script>
  <!-- <script src="{{ asset('assets/vendor/php-email-form/validate.js')  }}"></script> -->
  <script src="{{ asset('assets/vendor/swiper/swiper-bundle.min.js')  }}"></script>

  <!-- Template Main JS File -->
  <script src="{{ asset('assets/js/main.js')  }}"></script>

</body>

</html>