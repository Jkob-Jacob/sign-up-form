<?php

class FormDataProcessor {

    private $formData = [];
    
    
    public function __construct() {

        foreach ($_POST as $field => $value) {

            $this->formData[$field] = $this->validateFieldValues($field,$value);
        }
    }


    private function generateID($email) {

        $this->formData["id"] = hash("md5",$email,FALSE);
    }


    private function validateFieldValues($field, $value) {

        if($field === "email") {

            return $this->validateEmailValue($value);

        } else {

            return $this->sanitizeFieldValue($value);
        }
    }


    private function validateEmailValue($value) {

        $email = filter_var($this->sanitizeFieldValue($value),FILTER_SANITIZE_URL);

        if(filter_var($email,FILTER_VALIDATE_EMAIL)) {

            $this->generateID($email);
            return $email;

        } else {

            return NULL;
        }
    }


    private function sanitizeFieldValue($value) {
        return trim($value);
    }


    public function getData() {
        return $this->formData;
    }
}
?>