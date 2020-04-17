import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;

public class ClienteTCP {
	public static void main(String[] args) {
		ClienteTCP a = new ClienteTCP("127.0.0.1",8888);
		a.iniciar();
	}
	Socket client;
	Scanner input;
	PrintStream output;
	int port;
	String addr;
	ClienteTCP(String addr,int p){
		port = p;
		this.addr = addr;
	}
	public void iniciar() {
		try {
			client = new Socket(addr,port);
			System.out.println("Cliente iniciado");
			Scanner sc = new Scanner(System.in);
			System.out.print("Fecha\nInformacion del socket (infs)\nIngrese su solicitud: ");
			String req  = sc.nextLine();
			output = new PrintStream(client.getOutputStream());
			output.print(req);
			input = new Scanner(client.getInputStream());
			String s= input.nextLine();

			System.out.println("Respuesta: "+s);
		}
		catch(Exception e) {
			System.out.println(e);
		}
		finally {
			try {
				client.close();
				output.close();
				input.close();
			}
			catch(Exception e) {

				System.out.println(e);
			}
		}
	}
}
