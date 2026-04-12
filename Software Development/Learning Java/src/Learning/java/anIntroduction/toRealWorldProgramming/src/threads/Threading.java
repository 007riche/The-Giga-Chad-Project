package threads;

public class Threading {
    public static void main( String args [] ) {
//        new ShowThread("Foo").start();
//        new ShowThread("Bar").start();
        Thread foo = new ShowThread("Foo");
        foo.setPriority( Thread.MIN_PRIORITY );
        Thread bar = new ShowThread("Bar");
        bar.setPriority( Thread.MAX_PRIORITY );
//        foo.start();
//        bar.start();
    }
    static class ShowThread extends Thread {
        String message;
        ShowThread( String message ) {
            this.message = message;
        }
        public void run() {
            while ( true )
                System.out.print( message + "\t" );
        }
    }
}
