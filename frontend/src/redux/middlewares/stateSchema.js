export default {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
        "isLoading"
    ],
    "properties": {
        "isLoading": {
            "$id": "#/properties/isLoading",
            "type": "boolean",
            "title": "The Isloading Schema",
            "default": false,
            "examples": [
                true
            ]
        }
    }
};