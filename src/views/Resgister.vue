<template>
  <div>
    <van-nav-bar
      title="账号注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="resgisterInfo.userName"
        name="userName"
        label="用户昵称："
        placeholder="请输入用户昵称"
        clearable
      />
      <van-field
        v-model="resgisterInfo.userAccount"
        name="userAccount"
        label="用户账号："
        placeholder="用户账号"
        clearable
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="resgisterInfo.password"
        type="password"
        name="password"
        label="用户密码："
        placeholder="用户密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="resgisterInfo.password2"
        type="password"
        name="password2"
        label="再次输入密码："
        placeholder="用户密码"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { resgister } from '@/api/e-reader'
const Base64 = require('js-base64').Base64
export default {
  name: 'Resgister',
  data () {
    return {
      resgisterInfo: {
        userName: '',
        userAccount: '',
        password: '',
        password2: ''
      }

    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'Login'
      })
    },
    onSubmit (values) {
      if (values.password !== values.password2) {
        this.$notify({ type: 'warning', message: '两次密码输入不一致，请重新输入', duration: '1500' })
      } else {
        let user = {
          userName: values.userName,
          userAccount: values.userAccount,
          password: values.password
        }
        this.handleResgister(user)
      }
    },
    async handleResgister (user) {
      try {
        const res = await resgister(Base64.encode(user.userAccount), Base64.encode(user.password), user.userName)
        if (res.code === 1) {
          this.$notify({ type: 'success', message: res.hint, duration: '1000' })
        } else {
          this.$notify({ type: 'warning', message: res.hint, duration: '1500' })
        }
      } catch (e) {
        this.$notify({ type: 'warning', message: '注册异常', duration: '1500' })
      }
    }
  }
}
</script>

<style scoped>
.van-form{
  margin: 1.8rem 0.4rem;
}
</style>
