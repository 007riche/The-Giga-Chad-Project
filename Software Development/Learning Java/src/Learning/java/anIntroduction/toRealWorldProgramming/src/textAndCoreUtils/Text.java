package textAndCoreUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Float.NaN;

/**
 *
 * <blockquote><pre>
 * Again, this is by no means a perfect email validator, but it is
 * definitely a good start and will suffice for our simple login system
 * once we add networking. If you want to tinker around with the
 * validation pattern and expand or improve it, remember you can
 * “reuse” lines in jshell with the keyboard arrow keys. Use the up
 * arrow to retrieve the previous line. Indeed, you can use the up arrow
 * and down arrow to navigate all of your recent lines. Within a line,
 * use the left arrow and right arrow to move around and
 * delete/add/edit your command. Then just press the Return key to run
 * the newly altered command—you do not need to move the cursor to
 * the end of the line before pressing Return
 * </pre></blockquote>
 *
 */

public class Text {
    public static void main(String[] args) {
//        String emailSample1 = "Jane.doe@etu.stanford.university.edu";
//        String emailSample2 = "Jane.doe@etu.stanford546.university.edu";
//        String emailSample3 = "Jane.doe@etu.stanfor!#d'.university.edu";
//
//        String emailValidationPatternString = "[^@]+@[^@0-9]+\\.[a-z]+";
//
//        System.out.println("Matche string 1: "+ Pattern.matches("(?i)"+emailValidationPatternString, emailSample1));
//        System.out.println("Matche string 2: "+ Pattern.matches("(?i)"+emailValidationPatternString, emailSample2));
//        System.out.println("Matche string 3: "+ Pattern.matches("(?i)"+emailValidationPatternString, emailSample3));
        String text="A horse is a horse, of course of course...";
        String pattern="horse|course";
        Matcher matcher = Pattern.compile(pattern).matcher(text);
//        while ( matcher.find() )
//            System.out.println("Matched: '"+matcher.group()+"' at position "+matcher.start() );
//
//        System.out.println("MAtcher group Count: "+matcher.groupCount());
//        for (int i = 1; i< matcher.groupCount(); i++) {
//            System.out.println("Matcher group: "+matcher.group(i));
//        }
        System.out.println(NaN != NaN);
    }
}
