package collectionAndGenerics;

import java.util.Date;

public class collections {
    public static void main(String[] args) {
        Bouded<Date> dateBouded = new Bouded<Date>();
//        Bouded<Date> container = new Bouded<DerivedDate>(); // Error. Why ?
        Bouded<DerivedDate> container = new Bouded<DerivedDate>(); // Good. why?
        System.out.println("Upper bound type, dateBouded instanceof " +
                "Bouded<Date>: "+ (dateBouded instanceof Bouded<Date>));
        System.out.println("Derived type, container instanceof Bouded<Date>? false " +
                "<DerivedDate>? "+ (container instanceof Bouded<DerivedDate>));

    }

    static class Bouded<E extends Date> {
        public  void addElement(E elm) {
            System.out.println("Compiled");
        }
    }

    class DerivedDate extends Date {
        DerivedDate() {
            System.out.println("Used DerivedDate");
        }
    }
}
