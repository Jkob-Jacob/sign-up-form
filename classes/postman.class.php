<?php

class Postman {

    private $formData,
            $curl,
            $response;


    public function __construct($formController,$url) {

        $this->formData = $formController->getData();
        $this->curl = curl_init($url);

    }


    public function post() {

        curl_setopt($this->curl, CURLOPT_POST, 1);
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode($this->formData));
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        
        $this->response = curl_exec($this->curl);
        curl_close($this->curl);

        return $this->response;
    }

}

?>