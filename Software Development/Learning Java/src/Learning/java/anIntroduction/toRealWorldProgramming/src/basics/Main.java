package basics;

import hierachy.Animal;
import hierachy.Cat;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Animal ricat = new Cat();

        ricat.eats();

//        ricat.purr();


//        System.out.println("Hello, java");
//        JFrame frame = new JFrame( "Hello, Java!" );
//
//        frame.add( new basics.HelloComponent2("Hello, Java!") );
//        frame.setDefaultCloseOperation(
//                JFrame.EXIT_ON_CLOSE );
//        frame.setSize( 300, 300 );
//        frame.setVisible( true );
    }
}
class HelloComponent2 extends JComponent
        implements MouseMotionListener
{
    String theMessage;
    int messageX = 125, messageY = 95; //
    //Coordinates of the message
    public HelloComponent2( String message ) {
        theMessage = message;
        addMouseMotionListener(this);
    }
    public void paintComponent( Graphics g ) {
        g.drawString( theMessage, messageX, messageY
        );
    }
    public void mouseDragged(MouseEvent e) {
        // Save the mouse coordinates and paint the message.
        messageX = e.getX();
        messageY = e.getY();
        repaint();
    }
    public void mouseMoved(MouseEvent e) { }


}
