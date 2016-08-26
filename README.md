# Role required middleware

A simple Express middleware to check roles in the session.

### Usage

```javascript
var express = require('express');
var roleRequired = require('role-required');

var router = express.Router();

router.use('/admin', roleRequired({
    errorStatus: 403,
    errorMessage: "Forbidden",
    rolesField: "roles",
    roleRequired: "admin" 
}));
```

### Notes
The middleware will check that `req.session` has a string array named as specified by the `rolesField` option, containing the string identified by the `roleRequired` option. The status, message and rolesField are optional and will default to `403`, `Forbidden` and `roles`. The error generated is an `http-error` and can be dealt by `http-error-express` (see related modules).
