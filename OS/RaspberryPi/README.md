# Raspberry pi

## Install

https://www.raspberrypi.org/software/

### After write

Edit file.

#### /boot/config.txt

Add last line.

```
dtoverlay=dwc2
```

#### /boot/cmdline.txt

If you want to use ssh, add `modules-load=dwc2,g_ether quiet` between `rootwait` and `init`.

```
... rootwait modules-load=dwc2,g_ether quiet init ...
```

#### /boot/ssh/

Create empty dir.

## Setup

### Login

* User
  * pi
* Password
  * raspberry

### Raspberry pi config

```sh
sudo raspi-config
```

#### 5 Location options

##### L1 Locale

```
ja_JP.UTF-8 UTF-8
```

```
C.UTF-8
```

##### L2 Timezone

```
Asia
```

```
Tokyo
```

##### L3 Keyboard

UK → US

```
Generic 105-key PC(Intl.)
```

```
Other
```

```
English (US)
```

```
English (US)
```

```
The default for the keyboard layout
```

```
No compose key
```

##### L4 WLAN Country

```
JP Japan
```

#### 6 Advanced Options

```
A1 Expand filesystem
```

#### 1 System Options

##### S4 Hostname

##### S6 Network at Boot

##### S1 Wireless LAN

### 8 Update

###　Other

```
sudo su -
```

#### Add root password.

```
passwd
```

#### Update and install.

```
apt-get upgrade
apt-get install vim
```

### Add user.

```
adduser USERNAME
```

Memo `pi` group.

```
groups pi
```

Add group

```
usermod -G GROUP1,GROUP2,...,GROUPN USERNAME
```

Reboot and login new user.

### Disable pi

```
userdel -r pi
```

Reboot.

