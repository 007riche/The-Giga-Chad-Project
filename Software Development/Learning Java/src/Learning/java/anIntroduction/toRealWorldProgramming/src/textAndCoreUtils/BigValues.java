package textAndCoreUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;

public class BigValues {
    public static void main(String[] args) {
        long l1 = Long.MAX_VALUE;
        long l2 = Long.MAX_VALUE;
        try {
            BigDecimal db1 = new BigDecimal(l1);
            BigDecimal db2 = new BigDecimal(l2);
            System.out.println("REsult big int: "+db1.add(db2));

            BigDecimal bigDecimal1 = new BigDecimal(22);
            BigDecimal bigDecimal2 = new BigDecimal(7);
//            BigDecimal quotient = bigDecimal1.divide(bigDecimal2, 100, BigDecimal.ROUND_UP);
//            System.out.println("Quotient of big deci: "+quotient);
//            BigDecimal product =db1.multiply(db2);
//            BigDecimal squaredProduct = product.multiply(product);
//            BigDecimal expoFourProduct = squaredProduct.multiply(squaredProduct);
//            BigDecimal expoEightProduct = expoFourProduct.multiply(expoFourProduct);
//            BigDecimal expoSixteenProduct = expoEightProduct.multiply(expoEightProduct);
//            BigDecimal expo32Product = expoSixteenProduct.multiply(expoSixteenProduct);
//            BigDecimal expo64Product = expo32Product.multiply(expo32Product);
//            BigDecimal expo128Product = expo64Product.multiply(expo64Product);
//            BigDecimal expo256Product = expo128Product.multiply(expo128Product);
//            BigDecimal expo512Product = expo256Product.multiply(expo256Product);
//
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product: "+product);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Squared Product: "+squaredProduct);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^4: "+expoFourProduct);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^8: "+expoEightProduct);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^16: "+expoSixteenProduct);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^32: "+expo32Product);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^64: "+expo64Product);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^128: "+expo128Product);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^256: "+expo256Product);
//            System.out.println("+------------------------------------------------+");
//            System.out.println("Product^512: "+expo512Product);
        } catch (Exception e) {
//            throw new RuntimeException(e);
            System.out.println("Something went wrong");
        }
    }
}
