import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const provincesData = [
  {
    id: "1",
    title: "Bagmati",
    subtitle: "Hetauda",
    description:
      "Your voice is the foundation of progress in Bagmati Province. We invite you to submit your feedback on a wide range of topics, including urban development, environmental initiatives, and the quality of public service delivery. By sharing your insights, you help us shape a more efficient, livable, and sustainable future for our province and its citizens.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CdGZuTPhSoOt_JZM2_0LYeM4L_88RGvRgA&s",
  },
  {
    id: "2",
    title: "Koshi",
    subtitle: "Biratnagar",
    description:
      "Your insights are essential for the progress of Koshi Province. We encourage you to provide detailed feedback on services and public welfare projects. Your input is crucial for improving governance and shaping a brighter future for districts like Morang, Sunsari, and Jhapa.",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg/1200px-Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg",
  },
  {
    id: "3",
    title: "Gandaki",
    subtitle: "Pokhara",
    description:
      "Contribute directly to the development of Gandaki Province. We warmly welcome your feedback on topics ranging from tourism and sustainable development to critical infrastructure and public services. Your input helps us make this a better and more prosperous place for everyone.",
    imageUri:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxUQDxIQEA8PDxAVEA8PDw8PDw8VFRUWFhUVFxUYHSggGBolGxUWITEhJSkrLi4uFyAzODUtNygvLisBCgoKDg0OGxAQGi0lICUtLS0tLS0tLzAtLS0vLSstLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tK//AABEIALcBEwMBEQACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIEAwUGB//EAEAQAAICAQMCBAMGAwYEBgMAAAECAxEABBIhBTEGE0FRImFxFDJCgZGhI1LwB2KCscHRFSQzcjRTkqLh8SVUZP/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAA2EQACAgECBAMHBAICAgMBAAAAAQIRAxIhBDFBURNh8CJxgZGhscEUMtHhBfFCUlPSI3LiFf/aAAwDAQACEQMRAD8Arbc+oPmA24AbckBWAKsAdYAVkge3BAbcAe3AALgge3ACsAdYAVkgKwQOsAKwBhcAYXAHtwB7cAe3AHWBQVggdYJCsAe3ADbgD24A9uAG3AHtwQG3AHWAUqzM0CskBWALbkgKwArAHWCArAHWSB1gBWCArAHtwA24JHtwQG3AHtwB7cED25IHWAFYAwMANuAPbgDC4A9uAFYA6wArAHWAFYA6wB1gBWQArAKVZQ0CsAKyQFYAVgBWCArJA6wAC4BLbgDrBAbcAdYAVgBWCArJA6wB1gD24IDbgDrAHWAG3AHtwB1gBWCQrAHgBWAOsAdYA6wArAHWAFYIKVZmaBWAKskBtwA24A9uSArACsEDrBA6wB1kgKwB7cAe3ADbgDrACsAdYA9uCB1gBWSArAHWAFYA6wArAHWAFYA6wB1gBWAOsAKwArACsAqbczNArBAVgkKwArBFBtyQG3ADbkge3BA9uCB7cAKwB1gD24AVgDrJAVgkdYICsAdYAVggNuAOsAdYAVgBWAOsEhWCB1gBWAOsAdYAVgkKwQFYBVrMzQKyQKsAKwArACsAdYIHWSArBAVgDrJA6wQGAMDAHWAFYJDbgD24IHtwB1gBtwArJAVgDrACsAdYAbcAdYAVkAdYAVgBWAOsAKwArAKgGULhWAFYAVgBWSB1gBWCArJA9uAG3BA6wB1gBWSB1gBWAOsAkBgD24A9uAHH71+eUjkjLk+tfHsWljlGrXNX8O4VlygVgBWAFYAVgDrACsAKwB1gBWAFYA6wArACsAKwCpmZcMAMAMkBWAOsAKyQOsAdYICsAdYA6wArAHWSAAxZBILgEguAOOiLBB+nOUhLUrLzhpk0VdaWpVW7eZQDfIprNfkDnBxmaWrHijzlLn2Ud38+Xus7+DxRccmWXKMeXdyVL5Pf30VNO1LIx3nZKWHmFeGo7l4J9yL+fyzxo5cmOMs0V+3K3TfPV7LTq91fP5HtZMUMk4YG/wB2JLZP/junvWzrls9tza1n1Z8mFYAVggKwArJAVgDrACsgBgkMAMAeAGAFYAVgFSszLhWAKskDrAHWSArBA6wB1gBWCB1gDAyQOsgBWSBgZAJAYFCJo9ibHAA9R/X7ZRz0suo2jUdU129HiiO550aNI2CoI/gffJIWFqq/n8Sgc7s8rj+IbjUfL3+fnvy7Hq8Dw6jNOXT69vLzOa8NGXQ6zy53iA1p2oEUoEkBBUSIyqVJDcGuePexlwORwdLrsdH+Qism7XLc7kxEp8XBMhBPDVdm1JHFGjYrt9c6s/DRzxSm2nfNPde44eH4qXDzbgk1XJrZ+8qaLSowdW3FY9TtUHbubhO7AXRZiaujZsZzcN/jeHtzkr0ydbvpyvudnF/5TiGlGLrVBXsvO67GzIz3TwREYAqyQOsEBWALADAHWAFYA6wArACsiwFYJHWLICsAp1mdmlDrFig24sgW3JA6ybAVgDrAGBgUSC4FDrAodYIodYFABgEguLBILgkw68sIyUHxqpKGgQGogWO57kcX3zDiJSUG480bcPGLmlLk+ZysPUoH14OsKKn2NkEbSSRjc8gk8y1NhdqgVfIHzz5viOJnkjqa99e/sfSYuGhh2T6/jqc14u6zBMqJGY5NUsskrzwCYq0jtvVVLV712HPvm2DaDb25UZ5d5pLfnZ2/S+pCTSpKFoyMWeiqhG+CwRxRtiB9Rna86WPUzz3wzeXQjLpdS6mXiMmWUyxASMCyHaQ4BUFhS/hscd8nh+L1alHuRxHDadF9qN5X9cj/ADz1kzymgK5ayKFWCKFWSKDbixQbcCgrACsAe3FgNuRYHWLAqxZIYsDrIsigxYop1mZoPACsWKDbkge3JIDbiwPbgDrFgdZNgdZFge3Fih7cWKGBiwSAxZNEvr2zHiMyw4pZH09I2wYXlyRguvplPW6t107yJE8sgNJFFuLOSaFVyfX/ANJzzsf+RUuG8SfO6+Prmd8/8fp4jw4varvsvXI8wfzV6r5yKjSRT7VV/wDp3ZChgORQZRXfivTPJTj4aR7jxOcm+xf8XdO1s0kMupXSQmRjtMSBjIf5mB+FgPhHBI5AyYZFGOhcjNYFKTmiXQBLBqAZJN+maRfOtGdSqlX3gCwDuUWbPG8++bcPlUZpS2RXjMXiY3p3a5evW50EWrDdTkiVUVYYp/KMYAEu5VNmjyeRzxwB39Ojh4RhnyaeW9L3nn8RJz4fG5eVv3HXsue8jw2RIySKI1ixQVk2KHWLAqxYDbiyArFigrIsDrFkhtxYDbiwG3IsBtxYDbiyCnWZWbUOsmyKHWLFBWLFDrJsUOsWKHWTZFBWLFD24sUSAxYodYsUFYsUMDFiiQXFiiTMqKzMaUI1mia4IvjPP/ylvhJ15fdHf/jaXFQv1szVL4hghhn1Qa/s8DqvmOoaebap+BCbpV4v+/8ALPmMWPI4Ls26+l/g+i4mcHJ6enP8fdlbW6uHVS6ZWRiv25hIzKUpWiIRQey8qTYPGwH1BzuzYtEU+W3+zj4TO5a0unP8fk53xZrS+r3qzsIoqVmbe9BT2I7GzfHqcwxvVzPRUdOP3kvBnVJGb7I7rGhiDea53BbPIUcG7AFWBZbv62m9L1I5YrU5KQuhSonVpEVgYl0si7yRR2ALy30Xtno8Bl1Jzls3/Zwcfi0xjGPJJfc9CuxfuLz3U9jwmhEZNkCxYDACsWArACsEUFYFBWBQVgmgrFigrIsBWLAVixQViyCrtzCzooNuTZFBtybIoNuLFDAxYoYybIolixQ6xYoKxYodZNih1ixQ9uLFDC4sUTC4sUN4gylT2YEHkjv8/TKTSlFxfUtBuMlJdDx6TUvCZdHEsciamZQ32hRJIH3bb3nkXQvv+ufN4FrS1bSR9BllKM9n7LO86lMI9LEm5RqItR5pP/mON6Oee4+IAAHtdZzZZyllknyXsr4f6NuChFRpcnu/jucltX+IXYC0KoRw1sQSaHpXN+vPa8sr2O+VKNevX99i30NY3mlkZZXqNER0SRQjb0LEMo7C6N+/bO6GKDxtPr9Dxsk8in7L2+G/r4F7wno1j1MspDlwywqNhQttVpNzckgm17+i+pNZtwaWNOPn+DLjfbUWu35o7qNPgX/tX/LPYhJOKPHnFpsCMvZSiNZNkUFYsUAGBQVixQVkWKCsWTQVixQVixQVixQVkWKCsWKCsWKDIsUVG1F/h/QZxR26noSV9BrIPp9Rk6yPD8hgg9s0U9jJ49yW36frjxEPCkG3LKSZVwa5hWWsrQ6xYoKybIodYsDrFgYybFDGLIokBkWDIF+G6Jq7A28cevPGedxPHPHPRE9Dh+DU4a5FXRaoOz/xoaRiPL2EMPq4cg/kMy//AKUo/uiafoIP9sjmurdP0MerOvMbNKjJtr+Jpi4N72AI2tQI+Lj1q8pPPipzS37d2bYsOVtY3JV38jDN1AahvjcrV7ltkWlJ9ebPf1Avn3rxZ6tV99/n9fue1CCgvZK+m6VLqJagaTcRzwxjRSP5vlZFnnjvmkZtdCspRUbZvenaCWFpfILSvI43yLGIIFbzIrCCmsigDyK9QM7cfFPSk+S+p5k8Kbcu/wDojpOqtHrdTFQX+Mkzv/EkHOniQAUvJJ3G/wC6fe83/UrQ5RSq+vuM5Y3cItu6/LNv0rq/mM0JDJJHHG1Mtb0YfeAPPfg/Ue+ejw8o5cab6Hn8QpY5vzLxP0/QXnUlRyt2Rb+uBkohkaybIoKxYoKyLFBixQYsUGLFCORYoKxZNAcNihEH6/LIbJSGBjURQVixRhXSv7EflnH4i7nf4b5maNdn4Qzf3lJr8sq5autFlHT0slq3MlErTAVSrQAHYVk42oddiMicum5W8pvY5t4ke5g8c+xLyW/lP6HHiR7jwpdhmFgaIIOPFi97HgzTqh+S3tjxo9x4E+wCIn0yfGiupHgzfQnHpma6HbvyB/nh5oLqFgm+gm07DuP9f8slZYvkyHikuaIBctrSKqDfIyxIRyVsfPKSyJ7WXjikt6M00ikClC17ZENS5snJpfJUc/4g12o0gaeMxNEdgZXLRuCTS/FtYEEn12/nnj8dw0Xl1KdN9H5HqcDkk4adLddUabReMtYrBZERS9/gYhTzwxHHpnnVJ8pHoSxyjvpJy63V6mNmnMSBh/D8vzI3IHNsCBx8N2e2w8EZDyr9vMnHCnbRquqiOJBI4jNyRoIvjkVgzLucvuHI+Lgd9vfsQhNyyaYrarv8VzLTTUPa5lCNJ4mYwyWF2EaeMssY3Dba/FdW4I3H1PPHPTCWOTqS2fz9bGGSGRR25+ZvtL46gbTwh/tEjqtsr/8ALxgFgQAkYNoKHPy9TkZYtSajGl0MMcZOK1W31NZB13U/8Qd9LAXfW6dR5at5QjKMVVg8nrtVrBrvlsWKWXHpvezXK4wak06S7ebOt8L+HJtPK+q1Um+eaMIFVndY0sNyzcsSVX0AFULz2+GxPFGn1PF4nKsj2OhIzqs5dJEjJsaRVkWRpCsWNIbcWTpFWRqGkKxqGkdY1E6QrI1DSFY1DSIjDkTpHkahpI9uOa7j6ev9fPK662LaG9w3j+rxrQ8NkRu7gn6E5xbHo7iCm+eT9SckgN9H71H88nRZGuhlwe7X+mSoUVeQywxrX32H07ZWS8i8X5jl2j8Rv55MY30InKuRXMnz/fNdETHxJGbSoGYLuAv51lJ0ldF8epurM0mnQH73N+jA5SMr6Gk40Rah2s5dGbMBBzTVEy0zIXltS5FdMuZX1mr2KdhUvtOwcsN34bA5r/bMs+fwsbkvTNMGB5ZqLOeXofUp5N0pmeLug8pEU8klCGC0PhU3ff2rPAy5cuVe1z9dj3sUcWK1GvqR0Xg/qRdvNWGKNuVAMDVzY7Nur35/3x4SpU9/f6X0L+Mi7pvB+rChWfTA+pV5iTZJYcgk9/Vv0AAzZKNUzFz9q0WOpeD5JY9gMaEQJGllmSNgpVpAmyrZdo4qqPNknEYxTut+rKznJ7Xt2KvT/Beqji2NPC5AIBKy+p783XFCvl88PHDVqityVkdVIq6nwTrQAIJdMg3KWcb1kYA/dvYV7fL/AGyqxvU29zTxlp00UNT4N1wlEtiUjcDzoyxB44LIo9+CKx4b06aXzf8AIjmSle/0L/hWHW6bU7Z0kTSyRsWDkSLHIKo2lgXz2ofLtXbwUnBtN0voefxqWRJpbnYxzo33WB/a/pffPTWRdzzHia6GTbk6yNDDbjWNDDbjURpFtxqJ0BsyNY0BtxrJWNjC5XWifDY9mNaJ8N9iJXGtE+GyL0BkagoMPMX1OVbfQuorqQlkUC+eDyaPC+v5ev5ZVyaLLGmZ9g/oZHiDwTQ/bP8AuGa+GPFMZ1Psf3OWUCryEl1Le/640IhTZk+0n5ZGgtrDzh6/5nGkaiXmg+p/XI3ROzF5wrij86xuRskIT/TLUVtEhqB/d/fKuLLJoT6sjttyFHuWcuxOPXMx2ohdqulUsePkMznFRWqTpF4ScnSVm30PT/MXdMhUHtHuIP8Airt9M4J8S1tE7I8OmrkbaCERio1SMf3Von6nuf1zmlNy5s3jjUeSKvVYdU8daZ4klsfHPbKB6/DRs4TiuZEoy/4kdJFKF/jPue+4C7eOLFAd+/55La6ExT6mV79KskVa3ixRLb/VDJsUVeq6KaWLbppl08odT5jRiQbRdqVsXdj1wpVzRWUXWzMeh088ZKzusvwJUigKC3Ib4fT0Pc980Uk4ruUUZKW/Izyp64TJaK7jLlTW9WhZYvNhXeyMPOjB2yMhIG5OaYi/unv+xvCW9MznF1aRr11ZHFvQqwbDV9DV8fQ53QpxTOOTqTRbSSwGVmIPY3X1HyPyy23Yi/Mn5jfzH9cUiVZJZj/N+uQ0ESadvRshIl+RFix7t/7sWuwp9zEXP8x/U5b4Fd+4i9fiP6k4+A+ILOfcj9ThxCkZo9QeaBb/AA3lHA0UzKJJPY5GlDWYJJJLruVHxi+AODVepPB96yPZFsxaSdtgDMoILA+ZIiP8JIsj0urwnGuQeq9jUFznfpRw2xeacaUNTImU5OlDUQMxydKFsiZz7f6ZVpIlW+hE6n3/AEvIaXMul3M32wstrtADKor8RN8fscwtKSvzN2m47V0Kzaw3yfXOqMVVnHKTsPtR98nQiNYn1THt+2RoROpnoHhbpphgDP8A9WWmbjlQR8K/kOfqTnz/ABubxMm3JbHucJi8OFvmy/ruoRQD+I1NV7By9e9eg+ZofPONuuZ1c+Ron63qZzWnQwx9/MKh2I96YV+QBB/mznycVGK9nd+vXfyNY4G/3OjBquv66JP+lDNV/wAT+It+25V+7z+XzzbDxOHL1p9ny+ZWWCeN+1uu65/L0/I3PQ+onVReaVVaNfA24Hgc/Lm/0zfJDQ0YQnqui48fK1xtJJ7c/CRX73+WUsuY+oapYImkY1QpbBILEHaDXpfrkp70KfQ870n9osjqDI+jjITe6iLXFlFXROwqRRH3Tftmyjvy+38lMs8cW0numX+m+OZZJEV49MyPu3CA6lZIiACA4lQVY5HfjNYYXJ0ZzywUNS+R2CThvhPwvbfBzyASLBobuKuu15k1RKdmKWhZNADmzwPrkpijAjq6h0YOjqGR1IKspHBBHcZcqVNXAL7XY9uc2xyMMkTRSIyNSk1dlRwDxX+X+mejGpKzzpXCVItEODTKymgaYFTR7Gj6cH9MlOL5Mn2lzAXjYbjBOKQtkg3zORRNkhIvsf1OQ4snUZFnA7DKuLLKaA6o+l/tjQHMS68j1X86yHGPcKUuxlTXMByQfyP+mQ8aJWRjbWpt5HuGtq7837+/5XlPD8y/iLsabW9L08khco9tXaQ12A9co8O5ZZmkaOLriE/EpUe97s9d4zylkLI6lGRYYV+h/Q5VxaLKVmI9RU9mH52MKJLsxvqLF7lodzYr6XktxjzCUpciRU1ZFDiruiCpawO/YfLuMwlnSdL109xtHA3z9fkuL0QttcSbnDo6q8alUFc7arnaxHN8njPBy/5KTm1XLbn1PaxcBFQuzZJ4c1JQNH8YaWM7iACPLIWqL8fjyFx09np79e/r6F3wePdOXny7FnQeFImhQyPMJSKkClNofdRWivNHiwaNZ2x47N2Rxz4LDezb8+/zK+o8NKvKytQH4lB9Cfce2bx46fVIwlwUOjZDoqtpNSJeJQgcAD4CbWrs2BVnMeM4lSxNS2NOF4ZrItLs3es8RvL8KSRQLR+IyBjfPG5bN/QL9TnhSzPovXr3ntRwP/l+DSSKi/ENRA8hZSzMSVBtbKIUA3H4jbMT8IF83mU6ns79dzoxxSW6+389/Lq+ZsF695UagNpZG5DVLJ3vv9z25J9O1HMYYavf6Gkowm97Xy/n6fUoS60tL5i6qKNSfuD4wwHqQdtEk+hv3I7ZEeHglT3Lym9NKPTyMweDf5i6mKByWbzI5CJAGAO0gIFcBgV55Io3ffphmnjVQ3XZ8jknwzm94+5rn937+q8jcdH8ReZKNPI8EjtwksTgbzV8pd39M3WWMlyafbp8zJ8LmgtTVrv/ACbfqXSBqE2SSOqEEERbVv67gf8AbK17Sl2M1Ok1XM8s694Fk00rNp4ZpNIkMgd3eMFVVVAI7E8A9h6Z3LJB029+pxeG7exU8NCJZv4zhD5jGnG0kVH+IkUORz88meSeNaoRs1x44TTjJ0dt/wAZtKoTRhn2nzAXG2RlsEAgniwTzx3OYRzXu1T/AK938nQ+Grra9ctzHqOrSujKo3KyOu7efMQFT6FaPpVjmu/OR+o0veNfb6fi/cXXCqXKV/Df176OX8IdW1Gm166CWSWbSyowhaSNU2SEGUjj57h3I5+XHVjbnj1NU/n9TjywWPJpTteuh3j6xGnk03Ikhjika62lZN9VXJrZz2+8MvG+ZnKuRoJepwvDHOrDy5XCqbQUzGqPNWPqc7ccqVM4skN7RT631OI9QhkY/HFoGhl4O4DeZE9Pi/K6yuKKhNkzbnBFwa+Kyu6iGAN33I3Dn6Z02rq/XMw09aJjWQ8EOh3AEU4NggEH/wBw/UZNN8haXMmJ09Cp/MZOmRGqI2lA5oAe57Y0kajGdbH/ADJ+oy3hyK+JHuZBIG9j9CCD/vlXEspEnojaygqRRBAoj2OQ4pk6mhCwbHb1Hcckkn69sq41uWTvYjrNYEQngsqM20EE7QOTtu2Hbj14yuWWiLaLY46pU+RV0niDTMis0u1iOQOAK4/EL/POdcTCt2dL4Wd+yrRyeg0Suws2CjHbyGJ8pnWvz8sV67/TO7LxEop7+rS/n5HJj4aEmtvVN/x8xyaK2YiQg73G0rbWu+/XtaMoPy/LMv1co7V9fOv4Nf0kZb2ZtP00Em3VjztO0kEC+eDXfZ345PBrM5cdLt62LR4KPf1ubH7MEkURBmKtsMgVgSQImofy0wbtQqxzWc7zSlF365r7G6xRi0kb/ReEZmPxkRojKhRrZnjBJFMOPutt/wAAzknns6Y4qOmj0Wm0cW93CJGQRLNIF2UAPvcD0/c5zabd1ub6nVWct17+0yNLXQQtqpP/ADG3R6cH37bn/IAfPNo4r5mUsiXI0us8dJqYotN077ZHqGmssY4QZCwYlR8RHLNf5ZpLu2I45KN1sajU+INbEW87UamPy3COsujA2MRuCt/D4JFEfLnIUm/2tEUn0M3R/Eu6VTLqFK+Yt/8ALTj155QCqHP5ZTN4koVRMYRjLdHer4n6HX/iNP2I5Ml1wfb65xfp8nYlpEx4n6H/APs6buT99wOa/wBLyf00/wDqV9ky6frXR5TtTUadz7JKxagfrfrlXgkt2i8Ia3UFfu3E3V+ijhtRplN8j7QUN/Td8hhYZNciJQ0upKn8SJ6t0Wh/zWn4/wD7HPoOPvdu/GHgl/1+hGlFDqniDpsETTaPU6ZtShURB9Q8q8kKSV38/CThYZJ3p+heEY3uWuleKoXeEydT0zWAZIFSEbiUsqCORR5/LJ/+RP2obdzRQUvZju30NhD420jah9OxZKYLFNtZoJLA4LAfAd1im9u/OaOOxd8PlSTcX8mZ/EPhPTay2IEc7lL1CKGkpQo288UQqj8stjyyjyOaUEzzvrfhzWaNww3PG0zLE0ZYyFd0pBZE4Apx3sZ0qePIql9Silkx7xKb9dYwhiqgoi26gJI9aYs1gE18Sj3GSsEY7dDSXEyk3Lr6f5Met0MpkDuwLM1tsAAuNe4J5HcV6jb3s8WhGEFpjy7cwskpvU0m/kQhimA82IyM0oYPIGJd1FerG9oN0bN/555sSVKLr17zswcTqb1wT7cvPfl1+HuMaq2xIwtRxupRdoCKxY7SBur71813zDTP/wAj9fE3rH/4o/T/ANSU2nEjea6KzOqhvMUHerWo3EGyL4F5K1/+SXr4so447rwY9eX+kEfT45pAVjDEyx7mLEjcABRU3uIDVV+oFg1nQsk4q5zd9tr+O2xyTxY5WseNUr3V18N99/l9DDL4WBF7WRKu01L1wqn7xWjwien4Rmnjt/7/AKOd8Mk/6/8A0WOj6IQh0V5GQN8KyEHaCAR6et56f+OyOcZJ9GeV/ksKxuLXVfmjYlf/AKz0TyxbcChgVgGdNWyCy9AVe82vJr1+ZzLI8cVc2kjWDm3Udy7H1CwLWwRwVNgjKaYtWnZfxJJ01RU1GtWRRtWNZRvQmcKWCng8D3+E88f6efmnFJaqT35ndCMt2uXkaeHR6TaP4vv2jUgc/Ift/n3zjqH/AG+h1a5dvqbDS9M8qatztQ3AeRQpWhO373PEABr0Y/LLZONU40l9f/t/7fQtDh9Mufrb8L6mu6rroY5S38ekePeyorKb2te7ctr8bLYui/P3hc23D15fwi+lKdLr/f8ALNr4YhSZqJkCsjbGMaDc8RXj73F+Xfz59+eeXERlKuT/AJ/2bPBOEdXP3HZ6nW9P6arM8kcLPVqSzPLtHpFybsn7oHzyXBy2aM9aW6Zy3Vf7SpZAV0UIjW//ABGpr3/CgND5WT9MvDhbdcykuIpHIa3WSTvv1Ekurl/DuJCD32qBQH0AGehi4HrKkjiycX0W7I9bDBkSOwtPar+PihfvXOY8PXjK+W5tkvwZVz2+52nTvCsen6lpgh+GGB5tnx8MFVQ1lv5nPp+HPBxcQ8id9f4PWyTzOKjKVxXSkc/1vT/ahrKBaSXrEccbsTsi8mJg5c/TYPc19c7W1ijF9kzkdt0bDw70aNItHE28+bPri7KdknwSwadKI5At2avmR65hlm5JyXPb8s6oSkub2Lo6X0s9Q/4cINQZPMZPM847LWETMfvX2IHbvmLhlWPxLRH6i56TNovBmhrVPLHIyQTyIgErhtqKprvybPc5j4+VtJPmaudKzmPCUun1CSKI5jIRJJCD5UcIjQgbaVhT2CfYi7PqOzNCcXzX1v8A0Tg4ifPG2rvekazqAh3gSFVeVz5Uf2SNljAbbbuZQbsEi9wIIzWKlXs/f+iuTK3N+JV+7166Gq03TWlnkhX+JJG1Er2cm+Rlss9EVJ7WYwmpyaRgGmYUwsEcg+2PERpVGy8Latn18Olagk0ojZVREX4vxfDR3DjnIzQXhOfl3C4p48lR2fuR3Or8JSpHO7FgYnaipTYR3uz8Xaj2HY9u2ed+pVpI7f1/EclFP17+hh6P/aFr9C0MPUoXmXUBTE6eX55DdvXa/cDmj7k52LFCdyxOq59jzptJK+bPS+i9f0utG/TSq+wkOo+GSI+zKeV5B7+2YyTi1qVfYhNSTo57xd4S0ywmaJl02yKUCNVL+fI6kIvJvce3APfOnFkkufIzlFdObOGnR99S0tksFBDi38ogv+X4e31zqU4veO/mZ6JLaWxkbV2QK4Ml+pva7bh+e5TX1wokuVcjQ2wCKwYbk0he7G3Y+okZfqSF/XL11Kuck+f1M+gSWS4xy1JuUDkVGlJ24O+T6Uw+uaVGNX/r+/t7zLVOV6X/AH/X39xvemadUmCobPmqwB2d1eAAKONv/Rb29cpkj7Ka6/xf5NMc3bTfLl86M0zhfgVmIPlnax3gIF05r5GvMH55Sltt5/cs5ST5+tjmdV1MR60IzBAzAyE7gKAtjZNVwRxfb652cNNQarbucXEQc1vv2OiCg9ubr0r9s9ZSPKlAJIrBBsBgQaJB5474dSTQScWmhaNyyDf99SVf0+JTRIHsasfIjM4Senz6mk4LV5dDM8SspU9iCCe+VyxWSOl9ScfsO10MUkciqgi2kIOS5N8UBwOO1/oM5p4pQilDp3/BvHIpNuRq5upgGNgN7mTgbaWRSdtcnk0eSex/bzpT1ZIypt+eyfrkdq2g436ZX/4/CODp1BFCjSkV8mFj8818attKRVQVc2d3uVJCXlZgUKsJPPPlhhxXPN12zz2vZs7F+44zrMdtt7sPM2PsZ6W1Oym4O9Bt2n/Ws6YS6oiS6M0sWlijmuJ3AOwDasbgeZsFrb7iv8Va7n4hyeTiUYzW5aM5QZV6qskLS6l9knm6lh5u4MzE8sAPwkcim7ex75OOSVRW+3Mpljdye29ULWdR3xxeRIwkSE+YyGQNvfaSDtX5AV24y+PHJuTkuuxWU4pLS6pO/obCLqAl16hJJjHKyp5dOAW45YbuSNzHkWK9cxhhejTSuzaXEe3qUnTX4N112AHWQRBtm+WFbEix92ZiNxI7gV87A9cZ9k35MzwvlvW53D6r/wDIuBdjTEKxq6EgDD9SM83gMak3Z0cTNxicJ0rqbXLpkjMjN1CbVXuAsMgQbrFBfvG/Xt9eniYqSTboonW3kjrfCAj83SrNItpo55VshAGn1SOqDnmgv75nkj7O3rY0i3TR08Ph3SjWfb1LmcszcMChM6Rxnj/tRf398zlObh4fT+CiilLUYo9Or6bUIxK/aJdTyOG5WyR86GYtaZprpRpdxaOb8DeEI4I1mLlwA6iJ9pB2szBuw7Mbrtaqe4GW4viHLavVFsEajp9dDgfFHS5X1PmpyJdZOI23qvlsCv3htI7gn6tnVwueHh6X0SbKZ9Tmq9xsv7NNIy67WiavMiRgxuxuIkBIPr65XjZKeGDjyKcO6yMjpulFwiqtsyqAPcnOSWVpnSnZq/D+k8nxAsbi2inYAKTTMqcAGv8ATPRm9XCe9HKknnd+mem9d6iW02pMYYEkl1YbXRgotT6H15FjnPGjiqSvvf1O6U9LS8jUeIfDQ1LaCUzJFsjhUKygk7U84mywriOv8WdmDK4LJFRb3f8ABhOCklb7D8PeGBop5njkM8modWGy4Vh+J25kVj3Dj4Ryauq7TmyvLGOpaUvm/cvSIxw8NtJ23639WdBrdSXRJDbSGQhnkUBVUDkRICdin37nbzfGVyp6NPT/AHz9UX4eterr65GktpnEQXguwQknbJsZmAuuAFP5mh6HLRVJvy+VpG0mvXvZ0/R9CkUVKGfcdzWEchmA3Aewys5NsxilzJdQZdywEMgcbp2VQWWPmlG2yC+1hfoqObFA5vgi0nk+Xv8A6+9GOWSvT8/d/f8AJrxriSZGVQBpdOW8uwsdnUgUtk9mH9cZZx+7/BVS2NT1XqKxPIHrzwIzp0Ak2PGWtWc7a37QDwR27ZLnSS99+8tDE5uzndbrpJpWlb4S5varPsWgBwCeO375jre1N/M7FjiuaT+BzXiSRhsZS25HtSC5Itd3ofcDPT4duk7PN4pJPkV9H4mljkAYho67baPANdz753RyzXU8944PajanxW97lRJYxHvcC1kQBgpN9jyR7fpzifE5I1TW/kFw8Hdr6mx6b1XTD4mnCb1WxMDu3La7iwvnbsFmvu3mEOOnFtShfLl99zaXBwkk4z78/sbLT6hZCVgkimYDnyZEkofledq43A0nJ6b/AO233OX9HmTairrtuTLjkHjjkHivQjN4ZYTdRafxs554pR5pr4Gjnmlkd9kqJEm4BRsjNjgHceaNDn/4zgzOUm9LpI68VJLV1NPJQNMImbi23s26+bsDPOlF3+78m65HdxmVz5kMEjBrDb5IAKHsN3fLaaVSNbveJQl6XLKjOsbI+5WUySrsGxt1HaTwe3A7HJnOMOZMLZyckiiVqHEYI2gfDaebaizYX/lko9/hHHOX6WWi90vXrY3SzhkZNQkbR+bZ8x2YfEXZaAjPINAE+i16nK45KPyS+Rrlxue0fNmxh61CpjUCM7GFhFcFrRgosqOTYPyvN/FbfM5vA0p7erOS1LGOUaiAr9pErN5h37fi3bjTE8G854ZJ63fItJR0oy6fq2qk1Mc8oEssciNGqMsKkjgWa9eR7c5GZqUGrq0WwxbmqZPxL16d5RIZJdHJtIYwyOobkUKRrPAHqO3z4pwsFBPTuaZ09rexj6H1MaRGlbfPuFWx2qvDV6k9yT29PTIy4Hka6IjxElRn8IagO8skYbdtAkshUAYkgAc8WuZcVGSSi+XQ6OHnFttczpfIlkqolNlSLMR5HAIscHOLk9mzq1lRtHqBDuG5IxuJ2uEX2Pwq3yzTVvzK+y1yN3/Z9qCryGSWQqIWCgyzOgJtiQrEgGk7gZnxKc47fgRSVUcp1CcyEhSoT7TK6KUs82Ceex+nvnZDE4rdb0lz+JzZIqT59f6JdJSdBMUYqxDROYXaOzYY224FqBI59zXfK5mtlW3M04fHHFermWtENWhVkeQFRQNx/T1OYSlCX/FfU1jGK3DpAWPqMeq1AAYTMzyVbkjcCaX+qGaT1PH4a7E+ApS1I3niLxPA29SGUyngEMVZGKhGauQDyaHPfsaGVwcE405O/XX+vocc86lLSlv/AAaZevzFYXScrtJYN5SnjytqjkdgJSOff5ZtkjJKV+f3R04XjdPT25/EhHr9QASJ5CGJv4YyLJb4gGFA8KLA7KPnkyS29lc6+rEdO/rojpunakdQ0/8ABBVogGqXhAX8wp927+8oPbscrlai68/4szhFx3fY6bp/SvJVo40Plh7cblJsLGARf90L65zu3uyLtk9FsVZZGUV50zNaqSNtKf2UZZxtpe4lurOO6f1EySNuYq/lw+ZYJBd4tUGKjkVUYr259zfpZcUVtFbW6+aOKEm1b5/0a3xT4hfTKgRAwKJFuVzGb8oPZ+E87mb/ANPzyceJVbKym26Ry+n6g3BeVmccbpVMhO359+AfU5zZINu6PRxzjFVf0LnTuo77BFMtdhweavMcmJwp9GbQyKdrqir1GaMn+OC0Y2sQLvsV7j656fApbauR5f8AkNWl6OZYXoWmY2odCRwRK+ey8OJqzwFxGa6sqTeEJEQkAECQ1bj4lcqqC/wkWea59fTPMyTxwjJ3yPXw4suWcY0t/PuVJOjyc+XTAzNGFagwJJAv09DZGc3jKt+1nX+hm/2tfu0mrl1UsL0rvHR2uI3K7gp5BrvzffNNMZc1Zz6p45ON9d/gdlqPEc0EKum1idiuZdz8lCSVoiuR2+meZi4aE8ji/oelk4mUIJpL4mDpvX4tQA2pi0wlclVbyGYkc/eIPuf3zTNjyxdQbaXmVxPDOOqcVbLMvU+khiGhawaNK9WP8eUWHiWua9fAP9Lf7fXzP//Z",
  },
  {
    id: "4",
    title: "Madhesh",
    subtitle: "Janakpur",
    description:
      "We are committed to building a better Madhesh Province, and your active participation is key. Please share your thoughts and suggestions on local governance, infrastructure, and the quality of public services to drive meaningful progress and development across this entire region.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQsriurN8kXx293_ZdoqLiDGRksP_mOzRPA&s",
  },
  {
    id: "5",
    title: "Lumbini",
    subtitle: "Deukhuri",
    description:
      "You have the power to shape the future of Lumbini Province. We urge you to share your feedback on cultural preservation efforts, major development projects, and the efficiency of public services. Your suggestions are highly valued and will guide our collective efforts.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWB98QWIcHPND7n1WJ0Epp7emAMrLGkD01gQ&s",
  },
  {
    id: "6",
    title: "Karnali",
    subtitle: "Birendranagar",
    description:
      "Your feedback is more than a suggestion; it is essential for the sustained progress of Karnali Province. Please share your experiences and detailed suggestions on government services, infrastructure, and social development to help us address local needs and build a more resilient community.",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9P_Ljv-1MouJApWrviABvHK7ASu8gignrNw&s",
  },
  {
    id: "7",
    title: "Sudurpashchim",
    subtitle: "Godawari",
    description:
      "Help us improve governance and public services in Sudurpashchim Province. We are committed to listening to your feedback to address local issues, enhance regional growth, and ensure that every citizen has a voice in our shared future.",
    imageUri:
      "https://farsight.saviskarcdn.net/media/photos/tinywow_HimalDoc_Village-councillevelNaturalResourceManagement_Saipal_34415813_1.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  const renderProvinceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(`${item.title}`);
      }}
    >
      <Card mode="contained" style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.subtitle}
          left={(props) => <Avatar.Icon {...props} icon="image-filter-hdr" />}
        />
        <Card.Cover source={{ uri: item.imageUri }} />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.cardText}>
            {item.description}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>Choose Province</Text>

          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Avatar.Icon
              size={40}
              icon="account-circle"
              color="#1976d2"
              style={{ backgroundColor: "#e3f2fd" }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={provincesData}
          renderItem={renderProvinceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
  },
  cardText: {
    marginTop: 8,
    lineHeight: 22,
    color: "#555",
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingTop: 10,
  marginBottom: 5,
},

screenTitle: {
  fontSize: 30,
  fontWeight: '700',
  color: '#333',
},

profileIconContainer: {
  padding: 4,
  borderRadius: 20,
},

});

export default HomeScreen;
