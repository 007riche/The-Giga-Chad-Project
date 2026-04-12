package textAndCoreUtils;

import java.time.*;
import java.time.temporal.ChronoUnit;

/**
 * <h2>Packages and their elements which are explored here:</h2>
 * <pre>{@code {
 *+java.time.
 *      +-->format.DateTimeFormatter()
 *      +-->LocalDate()
 *      +-->LocalTime()
 *      +-->LocalDateTime()
 *      +-->temporal.ChronoUnit interface
 *      +-->Instant Class
 *      +-->ZoneId Class
 *      +-->ZonedDateTime Class
 *              +-->atZZone()
 *              +-->withZoneSameInstant()
 *      +-->OffsetDateTime class
 * } }</pre>
 */

public class TimeDateTimeAndDate {
    public static void main(String[] args) {

        /**
         * <pre>{@code local dates}</pre>
         */

        LocalDate todayNow = LocalDate.now(); // Without time zone
        LocalDate autoDetectToday = LocalDate.now(ZoneId.systemDefault()); // System default time zone
        LocalDate todayBrazilSaoPaulo = LocalDate.now(ZoneId.of("America/Sao_Paulo")); // Particular time zone, valid
        LocalDate oneWeekLaterFromNow = todayNow.plus(1, ChronoUnit.WEEKS);
        // format, try also ZoneId.ofOffset()
        System.out.println("Today: " + todayNow);
        System.out.println("One week later from today: " + oneWeekLaterFromNow);
        System.out.println("Auto detected today: " + autoDetectToday);
        System.out.println("Today in Brazil(SaoPaulo): " + todayBrazilSaoPaulo);
        // objects to date
        LocalDate stringDate = LocalDate.parse("2019-12-01"); // "2019/12/01": Error, why ?
        System.out.println("stringDate: " + stringDate);

        /**
         * <pre>{@code local times}</pre>
         */

        LocalTime localTime = LocalTime.now();
        Instant fromSecond = Instant.ofEpochSecond(45000l);
        LocalTime paresedFromEpochSecondInUAE = LocalTime.ofInstant(fromSecond, ZoneOffset.of("+04:00"));
        //+04:00 UAE Time offset from UTC-0
        System.out.println("Current time: " + localTime);
        System.out.println("Sync local at 45000 seconds from the beginning of epoch" + fromSecond);
        System.out.println("Sync local of 45000 seconds in UAE: " + paresedFromEpochSecondInUAE);
        /**
         * <pre>{@code DateTime}</pre>
         */

        ZonedDateTime dateTimeInTogoIn20301201At0635UTC0000 = LocalDateTime.
                of(2030, 12, 01, 06, 30, 35)
                .atZone(ZoneId.of("Africa/Lome"));
        ZonedDateTime dateTimeInIndiaIn20301201At0635UTC0000 = dateTimeInTogoIn20301201At0635UTC0000
                .withZoneSameInstant(ZoneId.of("Asia/Kolkata"));
        ZonedDateTime syncedToLocal = dateTimeInTogoIn20301201At0635UTC0000.withZoneSameLocal(ZoneId.systemDefault());

        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        System.out.println("NTP Togo 2030-12-01At06:30:35 : "+dateTimeInTogoIn20301201At0635UTC0000);
        System.out.println("NTP Sync India: "+dateTimeInIndiaIn20301201At0635UTC0000);
        System.out.println("NTP Sync Local: "+syncedToLocal);
    }
}
