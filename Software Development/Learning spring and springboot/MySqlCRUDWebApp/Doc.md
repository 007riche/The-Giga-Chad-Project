# These are my notes on how to use MySQL database in springboot with some other tips on springboot

## MySql DB in spring boot

To use MySQL DB in springboot, we have to:
### Connection
- Add the Mysql db dependency, when initializing the springboot project
- in InttliJ, in the `Database` panel on the right side, add (`+` button) Data source by choosing MySQL,
- ~~Add your DB name and the (logging, db user and password) credentials to the mysql server and test the connection to the mysql host~~
- Add the connection name? .....
- If the connection does not work, may be check and download the db connector which is usally the ***JDBC***  or ***ODBC*** connector (which are some JAR files to be added to the final package of the app or the IDE used) 
- To create a new data Schema (for tables), right-click on the DB source and `+New > Schema`

### Config in APP properties
In the app properties file located in `scr > resources` (*application.properties*), configure the data sources of the app and other related customizations for app,
Here are few properties in our case:

>***spring.datasource.url=`jdbc:mysql://localhost:3306/userdb`*** 
- for example (Remember that the DB could be located remotely, so use its *URL*, here we are on a local host and our mysql service is running on the port 3306 with the protocol jdbc:mysql://)
>spring.datasource.username=root
- Here, logging to mysql server with the `root` user
>spring.datasource.password=password
- The password of the `root` user to log in to the mysql server is `password`
>spring.jpa.hibernate.ddl-auto=update
- For the update of the operations performed on the schema, etc ... during development to be automatically handled by spring JPA service
>spring.jpa.properties.hibernate.show_sql=true
- another customization(show the running sql statement in operations running in the DB), online Docs of springboot for more info.


## Tip for spring dev
Seems like spring dev tools does not work by default. To enable them:
- Press 2 x ``Shift`` key,
- In the Key registry of IntelliJ, look for ***compiler.automake.allow.when.app.running*** and check its box i.e. : 
- [x] `compiler.automake.allow.when.app.running` 