<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ForecastIndexController extends AbstractController
{
    /**
     * @Route("/", name="forecast_index")
     */
    public function index(): Response
    {
        return $this->render('forecast_index/index.html.twig', [
            'controller_name' => 'ForecastIndexController',
            'apiHost' => $this->getParameter('api_host'),
        ]);
    }
}
