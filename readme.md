## Create an Edge Function:
 - Define a function in js file inside src/samples
 - Run the command:
    ```javascript
        source ./init.sh create function <function_name> <function_file_path> 
    ```
## Create an Edge App:
 - Run the command passing an app name:
    ```javascript
        source ./init.sh create app <app_name>
    ``` 

## Create an instance between Edge App and Edge Function existing:
 - Run the command passing a function id and an app_id:
    ```javascript
        source ./init.sh assign_func_to terminal_sign_name <function_id> <app_id>
    ```
 
## Create a rule and domain:
 - Run the command passing a domain_name, app_id and instance_id:
    ```javascript
        source ./init.sh set_domain <domain_name> <app_id> <instance_id>     
    ```

