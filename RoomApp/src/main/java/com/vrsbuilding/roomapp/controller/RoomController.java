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
import java.util.Calendar;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileUpload;
import org.hibernate.Session;
import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

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
		System.out.println(dateFormat.format(date));
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
		System.out.println(status + "hjbkkbkbh");
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

		System.out.println(eventText);
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
	public ModelAndView home() {
		ModelAndView view = new ModelAndView();
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
			System.out.println(amount);

		}
		System.out.println(dailyList);
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
		System.out.println(userWiseList);
		view.setViewName("userwise");
		return view;

	}

	@RequestMapping(value = "gotoEvent")
	public ModelAndView gotoEvent() {
		ModelAndView view = new ModelAndView();
		view.setViewName("event");
		return view;
	}

	@RequestMapping(value = "setEvent")
	public ModelAndView setEvent(@RequestParam(value = "event", required = false) String event,
			@RequestParam(value = "eventDate") String eventDate, HttpSession session,
			@RequestParam(value = "eventImage") MultipartFile eventImage) throws ParseException, IOException {

		String file = "";

		byte[] bytes = eventImage.getBytes();
		Path path = Paths.get(fileUpload + eventImage.getOriginalFilename());
		System.out.println(path + "poji");
		Files.write(path, bytes);

		ModelAndView view = new ModelAndView();
		userID = (Integer) session.getAttribute("name");
		roomService.setEvent(eventDate, event, userID, bytes);
		view.setViewName("event");
		return view;
	}

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

	@RequestMapping(value = "activateUser")
	public ModelAndView activateUser(@RequestParam(value = "userID") int userID) {
		ModelAndView view = new ModelAndView();
		System.out.println(userID);
		roomService.activateUser(userID);
		view.setViewName("userList");
		return view;

	}

	@RequestMapping(value = "logout")
	public ModelAndView logOut(HttpSession session) {
		ModelAndView view = new ModelAndView();
		view.setViewName("login");
		session.invalidate();
		return view;

	}

}
