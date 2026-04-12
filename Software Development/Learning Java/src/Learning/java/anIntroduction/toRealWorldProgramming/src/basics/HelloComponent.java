package basics;

import javax.swing.*;
import java.awt.*;

public class HelloComponent extends JComponent {
    @Override
    protected void paintComponent(Graphics g) {
//        super.paintComponent(g);
        g.drawString("Hello, Java", 125, 95);
    }
}
