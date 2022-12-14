## Create an Edge Function:
 - Define a function in js file inside src/samples
 - Run the command:
    ```javascript
        node src/index.js create function <function_name> <function_file_path> 
    ```
## Create an Edge App:
 - Run the command passing an app name:
    ```javascript
        node src/index.js create app <app_name>
    ``` 

## Create an instance between Edge App and Edge Function existing:
 - Run the command passing a function id and an app_id:
    ```javascript
        node src/index.js assign_func_to terminal_sign_name <function_id> <app_id>
    ```
 
## Create a rule and domain:
 - Run the command passing a domain_name, app_id and instance_id:
    ```javascript
        node src/index.js set_domain <domain_name> <app_id> <instance_id>     
    ```

