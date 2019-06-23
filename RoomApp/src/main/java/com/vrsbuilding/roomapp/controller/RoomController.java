package com.vrsbuilding.roomapp.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileUpload;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.mchange.net.MailSender;
import com.vrsbuilding.roomapp.bean.RegisterBean;
import com.vrsbuilding.roomapp.info.ExpensesDetails;
import com.vrsbuilding.roomapp.model.Event;
import com.vrsbuilding.roomapp.model.Expenses;
import com.vrsbuilding.roomapp.model.RoomRegister;
import com.vrsbuilding.roomapp.service.RoomService;

@Controller
public class RoomController {

	@Autowired
	private RoomService roomService;
	@SuppressWarnings("unused")
	@Autowired
	private RoomRegister roomRegister;
	@Autowired
	private RegisterBean roomBean;
	@Autowired
	private ExpensesDetails expensesDetails;
	@Autowired
	private JavaMailSender mailSender;
	// final static Logger logger = Logger.getLogger(RoomController.class);

	private int age;
	int userID, amt;
	private String dob, mobile;
	String dateOfBirth;
	private String firstName, lastName, email, password;
	private List<Expenses> dailyList;
	private List<Expenses> userWiseList;
	private int reportAmount;

	@RequestMapping(value = "/")
	public ModelAndView login() {
		ModelAndView view = new ModelAndView();
		view.setViewName("login");
		return view;
	}

	public static String fileUpload = "E://New folder//";

	public static Date currentDate() {
		DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		java.util.Date date = new java.util.Date();
		return (Date) date;

	}

	@RequestMapping(value = "/validate")
	public ModelAndView validate(@RequestParam(value = "userName") int userName,
			@RequestParam(value = "password") String password, javax.servlet.http.HttpSession session)
			throws ParseException, IOException {
		session.setAttribute("name", userName);
		ModelAndView view = new ModelAndView();
		String userPassword = roomService.getPassword(userName);
		String firstName = roomService.getFirstName(userName);
		int status = roomService.status(userName);
		List<RoomRegister> registerInfo = roomService.getRegisterUser(userName);

		for (RoomRegister roomRegister : registerInfo) {
			byte[] proPic = roomRegister.getProfilePic();
			if (proPic.length > 0) {
				byte[] encoded = Base64.encodeBase64(proPic);
				String encodedString = new String(encoded);
				view.addObject("proPic", encodedString);
			}

		}
		session.setAttribute("firstName", firstName);
		java.util.Date bDate = new java.util.Date();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		String date = sf.format(bDate);
		List<Event> eventText = roomService.showEvent(date);
		for (Event event : eventText) {
			event.getEvent();
			byte[] image = event.getEventImg();
			if (image.length > 0) {
				ByteArrayInputStream bis = new ByteArrayInputStream(image);
				session.setAttribute("image", image);
				BufferedImage bImage2 = ImageIO.read(bis);
				ImageIO.write(bImage2, "jpg", new File("E://New folder//.jpg"));

				byte[] encoded = Base64.encodeBase64(image);
				String encodedString = new String(encoded);
				view.addObject("image", encodedString);

				String eventDate = event.getEventDate();
				view.addObject("eventText", eventText);

			}

		}

		if (password.equalsIgnoreCase(userPassword) && status == 1) {
			view.setViewName("home");

		} else {
			view.setViewName("error");
		}

		return view;

	}

	@RequestMapping(value = "/showRegister")
	public ModelAndView showRegister() {
		ModelAndView view = new ModelAndView();
		view.setViewName("register");
		return view;
	}

	@RequestMapping(value = "/register")
	public ModelAndView register(@ModelAttribute(value = "RoomBean") RegisterBean roomBean,
			@RequestParam(value = "profilePic") MultipartFile profilePic, HttpSession session, BindingResult result)
			throws Exception {

		if (result.hasErrors()) {
			ModelAndView view2 = new ModelAndView();
			view2.setViewName("register");

		}
		SimpleDateFormat format = new SimpleDateFormat("dd/mm/yyyy");
		ModelAndView view = new ModelAndView();
		view.addObject(roomBean);

		byte[] bs = profilePic.getBytes();

		age = roomBean.getAge();
		firstName = roomBean.getFirstName();
		lastName = roomBean.getLastName();
		password = roomBean.getPassword();
		mobile = roomBean.getMobile();
		email = roomBean.getEmail();
		dob = roomBean.getDateOfBirth();
		roomService.register(firstName, lastName, age, mobile, password, email, dob, 0, bs);
		view.setViewName("register");
		return view;

	}

	@RequestMapping(value = "home")
	public ModelAndView home(@RequestParam(value = "userID") int name) {
		ModelAndView view = new ModelAndView();
		List<RoomRegister> registerInfo = roomService.getRegisterUser(name);

		for (RoomRegister roomRegister : registerInfo) {
			byte[] proPic = roomRegister.getProfilePic();
			if (proPic.length > 0) {
				byte[] encoded = Base64.encodeBase64(proPic);
				String encodedString = new String(encoded);
				view.addObject("proPic", encodedString);
			}

		}
		view.setViewName("home");

		return view;
	}

	@RequestMapping(value = "gotoDailyExpenses")
	public ModelAndView dailyExpenses() {
		ModelAndView view = new ModelAndView();
		view.setViewName("Dailyexpenses");
		return view;
	}

	@RequestMapping(value = "gotoMonthlyExpenses")
	public ModelAndView monthlyExpenses() {
		ModelAndView view = new ModelAndView();
		view.setViewName("Monthlyexpenses");
		return view;
	}

	@RequestMapping(value = "dailyExpenses")
	public ModelAndView dailyExpenses(@RequestParam(value = "type") String type,
			@RequestParam(value = "amount") int amount, @RequestParam(value = "expenseDate") String expenseDate,
			HttpSession session) throws Exception {
		ModelAndView view = new ModelAndView();
		Integer userID = (Integer) session.getAttribute("name");
		roomService.enterDailyExpenses(type, amount, userID, expenseDate);
		view.setViewName("Dailyexpenses");
		return view;

	}

	@RequestMapping(value = "monthlyExpenses")
	public ModelAndView monthlyExpenses(@RequestParam(value = "type") String type,
			@RequestParam(value = "amount") int amount, @RequestParam(value = "expenseDate") String expenseDate,
			HttpSession session) throws Exception {
		ModelAndView view = new ModelAndView();
		Integer userID = (Integer) session.getAttribute("name");
		roomService.enterMonthlyExpenses(type, amount, userID, expenseDate);
		view.setViewName("Monthlyexpenses");
		return view;

	}

	@RequestMapping(value = "getExpensesReport")
	public ModelAndView getExpensesReport() {
		ModelAndView view = new ModelAndView();
		view.setViewName("ExpenseReport");
		return view;
	}

	@RequestMapping(value = "expensesReport")
	public ModelAndView expensesReport(@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate, HttpSession session) throws ParseException {
		ModelAndView view = new ModelAndView();
		Integer userID = (Integer) session.getAttribute("name");
		SimpleDateFormat sf = new SimpleDateFormat("MM/dd/yyyy");
		java.util.Date fDate = sf.parse(fromDate);
		java.util.Date tDate = sf.parse(toDate);

		this.dailyList = roomService.getExpenseList(userID, fDate, tDate);
		for (Expenses expenses : dailyList) {
			int amount = expenses.getAmount();

		}
		view.addObject("dailyList", dailyList);
		session.setAttribute("dailyList", dailyList);
		view.setViewName("ExpenseReport");
		return view;
	}

	@RequestMapping(value = "gotoUserWise")
	public ModelAndView gotoUserWise() {
		ModelAndView view = new ModelAndView();
		view.setViewName("userwise");
		return view;

	}

	@RequestMapping(value = "userWise")
	public ModelAndView userWise(@RequestParam(value = "userName") int username,
			@RequestParam(value = "fromDate", required = false) String fromDate,
			@RequestParam(value = "toDate", required = false) String toDate, HttpSession session)
			throws ParseException {
		ModelAndView view = new ModelAndView();
		userID = (Integer) session.getAttribute("name");
		SimpleDateFormat sf = new SimpleDateFormat("MM/dd/yyyy");
		java.util.Date fDate = sf.parse(fromDate);
		java.util.Date tDate = sf.parse(toDate);
		this.userWiseList = roomService.userWise(username, userID, fDate, tDate);
		view.addObject("userWiseList", userWiseList);
		view.setViewName("userwise");
		return view;

	}

	@RequestMapping(value = "gotoEvent")
	public ModelAndView gotoEvent() {
		ModelAndView view = new ModelAndView();
		view.setViewName("event");
		return view;
	}

	// to set a event
	@RequestMapping(value = "setEvent")
	public ModelAndView setEvent(@RequestParam(value = "event", required = false) String event,
			@RequestParam(value = "eventDate") String eventDate, HttpSession session,
			@RequestParam(value = "eventImage") MultipartFile eventImage) throws ParseException, IOException {

		String file = "";

		byte[] bytes = eventImage.getBytes();
		Path path = Paths.get(fileUpload + eventImage.getOriginalFilename());
		Files.write(path, bytes);

		ModelAndView view = new ModelAndView();
		userID = (Integer) session.getAttribute("name");
		roomService.setEvent(eventDate, event, userID, bytes);
		view.setViewName("event");
		return view;
	}
	// to display userlist

	@RequestMapping(value = "gotoUserList")
	public ModelAndView gotoUserList() {
		ModelAndView view = new ModelAndView();
		List<RoomRegister> activatedList = roomService.getActivatedList();
		List<RoomRegister> DeactivatedList = roomService.getDeActivatedList();
		view.addObject("DeactivatedList", DeactivatedList);
		view.addObject("activatedList", activatedList);
		view.setViewName("userList");
		return view;
	}

	// to get current active users
	@RequestMapping(value = "activateUser")
	public ModelAndView activateUser(@RequestParam(value = "userID") int userID) {
		ModelAndView view = new ModelAndView();
		roomService.activateUser(userID);
		List<RoomRegister> activatedList = roomService.getActivatedList();
		List<RoomRegister> DeactivatedList = roomService.getDeActivatedList();
		view.addObject("DeactivatedList", DeactivatedList);
		view.addObject("activatedList", activatedList);
		view.setViewName("userList");
		return view;

	}

	// log-out method
	@RequestMapping(value = "logout")
	public ModelAndView logOut(HttpSession session) {
		ModelAndView view = new ModelAndView();
		view.setViewName("login");
		session.invalidate();
		return view;

	}

	@RequestMapping(value = "gotoMail")
	public ModelAndView gotoMail() {
		ModelAndView view = new ModelAndView();
		view.setViewName("mail");
		return view;
	}

	@RequestMapping(value = "sendMail")
	public ModelAndView sendMail(@RequestParam(value = "recipientMail") String RecepitMail,
			@RequestParam(value = "subject") String subject, @RequestParam(value = "message") String emailMessage,@RequestParam(value = "attachment") MultipartFile profilePic)
			throws MessagingException {

		ModelAndView view = new ModelAndView();
		SimpleMailMessage email = new SimpleMailMessage();
		MimeMessage message = mailSender.createMimeMessage();

			/*email.setTo(RecepitMail);
			email.setSubject(subject);
			email.setText(emailMessage);*/
			
		//	MimeMessage message = mailSender.createMimeMessage();
	        try {
	            MimeMessageHelper helper = new MimeMessageHelper(message, true);
	           
	            helper.setTo(RecepitMail);
	            helper.setSubject(subject);
	            helper.setText(emailMessage);
	        	byte[] bs = profilePic.getBytes();
	        	String contentType = profilePic.getContentType();
	        	String originalFilename = profilePic.getOriginalFilename();
	        	System.out.println(bs+"...."+originalFilename+";;;;;"+contentType);
	            helper.addAttachment(originalFilename, new ByteArrayResource(bs,originalFilename));
	            mailSender.send(message);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		view.setViewName("mail");

		return view;
	}

	@RequestMapping(value = "update")
	public ModelAndView updatePic(HttpSession session) {
		userID = (Integer) session.getAttribute("name");
		ModelAndView view = new ModelAndView();
		List<RoomRegister> registerInfo = roomService.getRegisterUser(userID);

		for (RoomRegister roomRegister : registerInfo) {
			byte[] proPic = roomRegister.getProfilePic();
			if (proPic.length > 0) {
				byte[] encoded = Base64.encodeBase64(proPic);
				String encodedString = new String(encoded);
				view.addObject("proPic", encodedString);
				System.out.println(encodedString);
			}

		}
		view.setViewName("profileUpdate");

		return view;
	}

	@RequestMapping(value = "gotoCalculate")
	public ModelAndView gotoCalculate() {
		ModelAndView view = new ModelAndView();
		view.setViewName("Calculate");
		return view;

	}
	
	@RequestMapping(value = "calculationReport")
	public ModelAndView calculationReport(@RequestParam(value = "fromDate", required = false) String fromDate,
			@RequestParam(value = "toDate", required = false) String toDate,
			@RequestParam(value = "userName", required = false) Integer userName, HttpSession session)
			throws ParseException {
		ModelAndView view = new ModelAndView();
		try {
		SimpleDateFormat sf = new SimpleDateFormat("MM/dd/yyyy");
		java.util.Date fDate = sf.parse(fromDate);
		java.util.Date tDate = sf.parse(toDate);
		Long sumPerHead = roomService.calculationList(fDate, tDate);
		System.out.println(sumPerHead+"per head");
		session.setAttribute("tDate", tDate);
		session.setAttribute("fDate", fDate);
		session.setAttribute("sumPerHead", sumPerHead);
		
		view.setViewName("Calculate");
	
		} catch (Exception e) {
			// TODO: handle exception
		}
		return view;
		

	}

	@RequestMapping(value = "calculate")
	public ModelAndView calculate(@RequestParam(value = "userName",required=false) int userName, HttpSession session) {
		ModelAndView view = new ModelAndView();
		java.util.Date fDate = (java.util.Date) session.getAttribute("fDate");
		java.util.Date tDate = (java.util.Date) session.getAttribute("tDate");
		Long sumPerHead = (Long) session.getAttribute("sumPerHead");
		Long userAmount = roomService.calculateAmount(fDate, tDate, userName);
		Long userAmountMonth = userAmount - sumPerHead;
		session.setAttribute("userAmountMonth", userAmountMonth);
		view.setViewName("Calculate");
		return view;

	}
	
	@ResponseBody
	@GetMapping(value="getMailforAjax")
	public String getMailforAjax(@RequestParam(value="Id")String Id ) {
	     
		String maailId = roomService.getMaailId(Id);
		return maailId;
		
	}
	
	
	
}
