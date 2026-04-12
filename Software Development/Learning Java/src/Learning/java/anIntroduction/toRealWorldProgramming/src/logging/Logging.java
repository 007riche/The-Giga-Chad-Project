package logging;

import java.util.logging.Logger;

/**
 * Note: While configuring the system property file through the IDE on the Java
 * virtual machine, ensure that you are not using a file path containing space
 * inside.
 * <br/>
 * Cost of the lesson: {@code 5 Hours}
 */
public class Logging {
    public static void main(String[] args) {

    Logger logger = Logger.getLogger("logging.Logging");

        logger.severe("Power lost - running on backup!");
        logger.warning("Database connection lost, retrying...");
        logger.info("Startup complete.");
        logger.config("Server configuration: standalone, JVM version 1.5");
        logger.fine("Loading graphing package.");
        logger.finer("Doing pie chart");
        logger.finest("Starting bubble sort:  value ="+42);
    }
}
