package com.test;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.openqa.selenium.*;
import org.testng.annotations.*;

public class TestNGClass {
   private WebDriver wd;
   private String URL = "https://www.flipkart.com/";
   
   @Test(priority = 1)
	public void closelogin() throws InterruptedException {

		wd.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

		wd.findElement(By.cssSelector(
				"body.fk-modal-visible:nth-child(2) div._2Sn47c:nth-child(14) div._2hriZF._2rbIyg div._2QfC02 > button._2KpZ6l._2doB4z"))
				.click();
		Thread.sleep(3000);
	}

	@Test(priority = 2)
	public void mobile() throws InterruptedException {

		wd.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		wd.findElement(
				By.xpath(" //body/div[@id='container']/div[1]/div[2]/div[1]/div[1]/div[3]/a[1]/div[1]/div[1]/img[1]"))
				.click();
		Thread.sleep(3000);
		wd.findElement(By
				.xpath("//body/div[@id='container']/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/div[1]/input[1]"))
				.sendKeys("iPhone 13");
		Thread.sleep(3000);
		wd.findElement(By
				.xpath("//body/div[@id='container']/div[1]/div[1]/div[1]/div[2]/div[2]/form[1]/div[1]/button[1]/*[1]"))
				.click();
		Thread.sleep(3000);
	}

	@Test(priority = 3)
	public void ScrollBar() throws Exception {
		String execScript = "return document.documentElement.scrollHeight>document.documentElement.clientHeight;";
		JavascriptExecutor scrollBarPresent = (JavascriptExecutor) wd;
		Boolean test = (Boolean) (scrollBarPresent.executeScript(execScript));
		if (test == true) {
			System.out.print("Scrollbar is present.\n");
		} else if (test == false) {
			System.out.print("Scrollbar is not present.\n");
		}
	}

	@Test(priority = 4)
	public void scroll() throws Exception {
		JavascriptExecutor js = (JavascriptExecutor) wd;
		js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
		Thread.sleep(5000);
		js.executeScript("window.scrollTo(document.body.scrollHeight,0)");
		Thread.sleep(5000);
	}

	@Test(priority = 5)
	public void scrolltoProduct() throws Exception {
		WebElement element = wd.findElement(
				By.xpath("//*[@id=\"container\"]/div/div[3]/div[1]/div[2]/div[5]/div/div/div/a/div[2]/div[1]/div[1]"));
		((JavascriptExecutor) wd).executeScript("arguments[0].scrollIntoView();", element);
		System.out.println(element.getText());
		Thread.sleep(5000);

	}

	@Test(priority = 6)
	public void loadImage() throws Exception {
		wd.findElement(By.className("L0Z3Pu")).click();
		Thread.sleep(5000);
		// load image
		WebElement image = wd.findElement(By.className("_3exPp9"));
		Thread.sleep(5000);
		Boolean p = (Boolean) ((JavascriptExecutor) wd).executeScript("return arguments[0].complete "
				+ "&& typeof arguments[0].naturalWidth != \"undefined\" " + "&& arguments[0].naturalWidth > 0", image);
		if (p) {
			System.out.println("Image present");
		} else {
			System.out.println("Image not present");
		}
		// Scrolling page and frequency
		JavascriptExecutor js = (JavascriptExecutor) wd;
		js.executeScript("window.scrollTo(0,1000)");
		
		Thread.sleep(3000);
		wd.navigate().refresh();
		
		Wait<WebDriver> wait = new FluentWait<WebDriver>(wd)						
				 .withTimeout(30, TimeUnit.SECONDS) 			
				.pollingEvery(5, TimeUnit.SECONDS) 			
				.ignoring(NoSuchElementException.class);
		WebElement clickseleniumlink = wait.until(new Function<WebDriver, WebElement>(){
		
			@Test
			public WebElement apply(WebDriver driver ) {
			//	return driver.findElement(By.cssSelector("#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._3_C9Hx > div > a:nth-child(1) > img"));
				
				WebElement element= driver.findElement(By.cssSelector("#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div.go_DOp._2errNR > div > div > div > a"));
				String getTextOnPage= element.getText();
				
				if(getTextOnPage.equals("Login")) {
					System.out.println(getTextOnPage);
					System.out.println("Passed");
					return element;
				}
				else {
					System.out.println("Fluent Wait Fail!, Element Not Loaded Yet");
					return null;
				}
				
				
			}
		});
	}

/*	@Test(priority = 7)
	// Verify that the image is downloaded just before the user scrolls to its
	// position and gets displayed in time

	public void imageLoad() throws InterruptedException {
		wd.findElement(By.className("_2doB4z")).click();
		WebDriverWait wait = new WebDriverWait(wd, 10);
		JavascriptExecutor js = (JavascriptExecutor) wd;
		int elementCount = wd.findElements(elementlocator).size();
		while (true) {
			js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
			wait.ignoreAll(NoSuchElementException.class)
					.until(ExpectedConditions.invisibilityOfElementLocated(elementLocator));
			Thread.sleep(2000);
			if (wd.findElements(elementLocator).size() == elementCount)
				break;
			elementCount = wd.findElements(elementLocator).size();
		}
	}
	*/
 
   @Parameters("browser")
   @BeforeClass
   public void launchapp(String browser) {

     if (browser.equalsIgnoreCase("chrome")) {
         System.out.println(" Executing on CHROME");
         System.setProperty("webdriver.chrome.driver","F:\\Phase5\\chromedriver.exe");
         wd = new ChromeDriver();
         long start = System.currentTimeMillis();
         wd.get(URL);
         System.out.println("Chrome: Title: " + wd.getTitle());
         long finish = System.currentTimeMillis();
 		long Total_time = (finish - start) / 1000;
 		System.out.println("Chrome:Total page load time: " + Total_time + " seconds");
 		if (Total_time > 10)
 			System.out.println("Page load time is more than expected in Chrome:(");
 		else
 			System.out.println("Hurray! Page loaded quickly in Chrome :D");
         wd.manage().window().maximize();
      } else if (browser.equalsIgnoreCase("firefox")) {
         System.out.println("Executing on Firefox");
         System.setProperty("webdriver.ie.driver", "F:\\Phase5\\geckodriver.exe");
         wd = new FirefoxDriver();
         long start = System.currentTimeMillis();
         wd.get(URL);
         System.out.println("Firefox: Title: " + wd.getTitle());
         long finish = System.currentTimeMillis();
 		long Total_time = (finish - start) / 1000;
 		System.out.println("Firefox:Total page load time: " + Total_time + " seconds");
 		if (Total_time > 10)
 			System.out.println("Page load time is more than expected in Firebox:(");
 		else
 			System.out.println("Hurray! Page loaded quickly in Firefox :D");
         wd.manage().window().maximize();
      } else {
         throw new IllegalArgumentException("The Browser Type is Undefined :(");
      }
   }


   @AfterClass
	public void closeBrowser() {
		wd.close();
	}
   }
